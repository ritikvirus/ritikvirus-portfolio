import type { APIRoute } from 'astro'
import crypto from 'crypto'

const PHONEPE_MERCHANT_ID = import.meta.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT'
const PHONEPE_SALT_KEY = import.meta.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3c6faf0e5d80'
const PHONEPE_SALT_INDEX = import.meta.env.PHONEPE_SALT_INDEX || '1'
const PHONEPE_BASE_URL = import.meta.env.PHONEPE_BASE_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox'

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
    const phonePeResponse = await fetch(`${PHONEPE_BASE_URL}/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': xVerify,
        'X-MERCHANT-ID': PHONEPE_MERCHANT_ID,
        'accept': 'application/json'
      }
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
