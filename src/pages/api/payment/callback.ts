import type { APIRoute } from 'astro'
import crypto from 'crypto'

const PHONEPE_SALT_KEY = import.meta.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3c6faf0e5d80'
const PHONEPE_SALT_INDEX = import.meta.env.PHONEPE_SALT_INDEX || '1'
const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.GOOGLE_SHEETS_WEBHOOK_URL

function verifyPhonePeResponse(response: string, xVerify: string): boolean {
  try {
    const data = response + '/pg/v1/status' + PHONEPE_SALT_KEY
    const hash = crypto.createHash('sha256').update(data).digest('hex')
    const expectedXVerify = hash + '###' + PHONEPE_SALT_INDEX
    return xVerify === expectedXVerify
  } catch (error) {
    console.error('Verification error:', error)
    return false
  }
}

async function sendToGoogleSheets(bookingData: any) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    console.log('Google Sheets webhook URL not configured, skipping data storage')
    return
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        hours: bookingData.hours,
        minutes: bookingData.minutes,
        totalAmount: bookingData.totalAmount,
        transactionId: bookingData.transactionId,
        status: 'completed'
      })
    })

    if (!response.ok) {
      console.error('Failed to send data to Google Sheets:', response.statusText)
    }
  } catch (error) {
    console.error('Google Sheets integration error:', error)
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData()
    const response = formData.get('response') as string
    const xVerify = request.headers.get('x-verify') || ''

    // Verify the response from PhonePe
    if (!verifyPhonePeResponse(response, xVerify)) {
      console.error('Invalid PhonePe response verification')
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid response verification'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Decode the response
    const decodedResponse = JSON.parse(Buffer.from(response, 'base64').toString())
    const { code, data } = decodedResponse

    if (code === 'PAYMENT_SUCCESS') {
      // Extract booking data from the response
      const transactionId = data.merchantTransactionId
      const amount = data.amount / 100 // Convert from paise to rupees

      // In production, retrieve booking data from database using transactionId
      // For demo purposes, we'll create a mock booking data
      const bookingData = {
        transactionId,
        amount,
        status: 'completed',
        paymentId: data.transactionId,
        // Add other booking details as needed
        name: 'User', // This should come from your database
        email: 'user@example.com', // This should come from your database
        phone: '1234567890', // This should come from your database
        hours: 1, // This should come from your database
        minutes: 0 // This should come from your database
      }

      // Send booking data to Google Sheets
      await sendToGoogleSheets(bookingData)

      return new Response(JSON.stringify({
        success: true,
        message: 'Payment processed successfully',
        transactionId,
        bookingData
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      console.error('Payment failed:', code, data)
      return new Response(JSON.stringify({
        success: false,
        message: 'Payment failed',
        code,
        data
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

  } catch (error) {
    console.error('Payment callback error:', error)
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
