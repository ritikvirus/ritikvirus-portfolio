import type { APIRoute } from 'astro'
import crypto from 'crypto'
import {
  PHONEPE_CLIENT_ID,
  PHONEPE_CLIENT_SECRET,
  PHONEPE_MERCHANT_ID,
  PHONEPE_SALT_KEY,
  PHONEPE_SALT_INDEX,
  PHONEPE_BASE_URL
} from 'astro:env/server'

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
  return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11)
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate environment variables
    if (!PHONEPE_MERCHANT_ID || !PHONEPE_SALT_KEY || !PHONEPE_CLIENT_ID || !PHONEPE_CLIENT_SECRET) {
      console.error('PhonePe environment variables not configured')
      return new Response(JSON.stringify({
        success: false,
        message: 'Payment service not configured'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const body: BookingRequest = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.totalAmount || body.totalAmount <= 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Missing or invalid required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Validate phone number format
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(body.phone)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid phone number format'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid email format'
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
