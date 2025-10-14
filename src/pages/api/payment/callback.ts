import type { APIRoute } from 'astro'
import crypto from 'crypto'
import {
  PHONEPE_SALT_KEY,
  PHONEPE_SALT_INDEX
} from 'astro:env/server'

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
  // For now, we'll log the booking data
  // In production, integrate with Google Sheets or database
  console.log('Booking completed:', {
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
  
  // TODO: Implement Google Sheets integration
  // You can use Google Sheets API or a webhook service like Zapier
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
