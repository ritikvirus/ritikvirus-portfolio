import type { APIRoute } from 'astro'
import crypto from 'crypto'

// Environment variables for PhonePe integration
const PHONEPE_MERCHANT_ID = import.meta.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT'
const PHONEPE_SALT_KEY = import.meta.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3c6faf0e5d80'
const PHONEPE_SALT_INDEX = import.meta.env.PHONEPE_SALT_INDEX || '1'
const PHONEPE_BASE_URL = import.meta.env.PHONEPE_BASE_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox'

interface BookingRequest {
  hours: number
  minutes: number
  totalAmount: number
  name: string
  email: string
  phone: string
  timestamp: string
}

function generateXVerifyHeader(base64Payload: string): string {
  const data = base64Payload + '/pg/v1/pay' + PHONEPE_SALT_KEY
  const hash = crypto.createHash('sha256').update(data).digest('hex')
  return hash + '###' + PHONEPE_SALT_INDEX
}

function generateTransactionId(): string {
  return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: BookingRequest = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.totalAmount) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Generate unique transaction ID
    const transactionId = generateTransactionId()
    
    // Create payment payload
    const paymentPayload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: 'USER_' + Date.now(),
      amount: body.totalAmount * 100, // PhonePe expects amount in paise
      redirectUrl: `${new URL(request.url).origin}/training/confirmation?txnId=${transactionId}`,
      redirectMode: 'POST',
      callbackUrl: `${new URL(request.url).origin}/api/payment/callback`,
      mobileNumber: body.phone,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    }

    // Encode payload to base64
    const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
    
    // Generate X-VERIFY header
    const xVerify = generateXVerifyHeader(base64Payload)

    // Store booking data temporarily (in production, store in database)
    // For now, we'll include it in the redirect URL
    const bookingData = {
      ...body,
      transactionId,
      status: 'pending'
    }

    // Store booking data (in production, use proper database)
    // For demo purposes, we'll encode it in the redirect URL
    const encodedBookingData = Buffer.from(JSON.stringify(bookingData)).toString('base64')

    // Make request to PhonePe
    const phonePeResponse = await fetch(`${PHONEPE_BASE_URL}/pg/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
        'accept': 'application/json'
      },
      body: JSON.stringify({
        request: base64Payload
      })
    })

    const phonePeResult = await phonePeResponse.json()

    if (phonePeResult.success && phonePeResult.data) {
      // Update redirect URL with booking data
      const updatedRedirectUrl = `${new URL(request.url).origin}/training/confirmation?txnId=${transactionId}&data=${encodedBookingData}`
      
      return new Response(JSON.stringify({
        success: true,
        paymentUrl: phonePeResult.data.instrumentResponse.redirectInfo.url,
        transactionId,
        redirectUrl: updatedRedirectUrl
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      return new Response(JSON.stringify({
        success: false,
        message: 'Failed to initiate payment with PhonePe'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

  } catch (error) {
    console.error('Payment initiation error:', error)
    return new Response(JSON.stringify({
      success: false,
      message: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const prerender = false
