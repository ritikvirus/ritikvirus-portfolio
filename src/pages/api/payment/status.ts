import type { APIRoute } from 'astro'
import crypto from 'crypto'
import {
  PHONEPE_MERCHANT_ID,
  PHONEPE_SALT_KEY,
  PHONEPE_SALT_INDEX,
  PHONEPE_BASE_URL
} from 'astro:env/server'

function generateXVerifyHeader(base64Payload: string): string {
  const data = base64Payload + '/pg/v1/status' + PHONEPE_SALT_KEY
  const hash = crypto.createHash('sha256').update(data).digest('hex')
  return hash + '###' + PHONEPE_SALT_INDEX
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const transactionId = url.searchParams.get('transactionId')
    
    if (!transactionId) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Transaction ID is required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Create status check payload
    const statusPayload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId
    }

    // Encode payload to base64
    const base64Payload = Buffer.from(JSON.stringify(statusPayload)).toString('base64')
    
    // Generate X-VERIFY header
    const xVerify = generateXVerifyHeader(base64Payload)

    // Make request to PhonePe status API
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-VERIFY': xVerify,
      'accept': 'application/json'
    }
    
    if (PHONEPE_MERCHANT_ID) {
      headers['X-MERCHANT-ID'] = PHONEPE_MERCHANT_ID
    }

    const phonePeResponse = await fetch(`${PHONEPE_BASE_URL}/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}`, {
      method: 'GET',
      headers
    })

    const phonePeResult = await phonePeResponse.json()

    if (phonePeResult.success && phonePeResult.data) {
      const { code, data } = phonePeResult.data
      
      return new Response(JSON.stringify({
        success: true,
        status: code,
        transactionId,
        amount: data.amount ? data.amount / 100 : null, // Convert from paise to rupees
        paymentId: data.transactionId,
        timestamp: data.responseTimestamp
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      return new Response(JSON.stringify({
        success: false,
        message: 'Failed to fetch payment status'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

  } catch (error) {
    console.error('Payment status check error:', error)
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
