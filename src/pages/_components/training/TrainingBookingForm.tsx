import { useState } from 'react'
import HourSelector from './HourSelector'
import UserDetailsForm from './UserDetailsForm'

interface BookingData {
  hours: number
  minutes: number
  totalAmount: number
  name: string
  email: string
  phone: string
}

export default function TrainingBookingForm() {
  const [bookingData, setBookingData] = useState<BookingData>({
    hours: 1,
    minutes: 0,
    totalAmount: 500,
    name: '',
    email: '',
    phone: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const pricePerHour = 500

  const handleDurationChange = (hours: number, minutes: number, totalAmount: number) => {
    setBookingData(prev => ({
      ...prev,
      hours,
      minutes,
      totalAmount
    }))
  }

  const handleDetailsChange = (details: { name: string; email: string; phone: string }) => {
    setBookingData(prev => ({
      ...prev,
      ...details
    }))
  }

  const isFormValid = () => {
    return (
      bookingData.name.trim().length >= 2 &&
      bookingData.email.trim().length > 0 &&
      bookingData.phone.trim().length > 0 &&
      bookingData.totalAmount > 0
    )
  }

  const handleBooking = async () => {
    if (!isFormValid()) {
      setError('Please fill in all required fields correctly')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Create booking request
      const bookingRequest = {
        hours: bookingData.hours,
        minutes: bookingData.minutes,
        totalAmount: bookingData.totalAmount,
        name: bookingData.name.trim(),
        email: bookingData.email.trim(),
        phone: bookingData.phone.trim(),
        timestamp: new Date().toISOString()
      }

      // Call payment initiation API
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingRequest),
      })

      const result = await response.json()

      if (response.ok && result.paymentUrl) {
        // Redirect to PhonePe payment page
        window.location.href = result.paymentUrl
      } else {
        setError(result.message || 'Failed to initiate payment. Please try again.')
      }
    } catch (err) {
      console.error('Booking error:', err)
      setError('An error occurred while processing your booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Hour Selector */}
      <HourSelector 
        onDurationChange={handleDurationChange}
        pricePerHour={pricePerHour}
      />

      {/* User Details Form */}
      <UserDetailsForm 
        onDetailsChange={handleDetailsChange}
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {/* Booking Summary */}
      <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Booking Summary</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between text-gray-300">
            <span>Training Duration:</span>
            <span>{bookingData.hours}h {bookingData.minutes}m</span>
          </div>
          
          <div className="flex justify-between text-gray-300">
            <span>Rate per hour:</span>
            <span>₹{pricePerHour}</span>
          </div>
          
          <div className="border-t border-gray-600 pt-3">
            <div className="flex justify-between text-lg font-semibold text-white">
              <span>Total Amount:</span>
              <span>₹{bookingData.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-800/30 border border-gray-600/50 rounded-lg p-4">
        <p className="text-sm text-gray-300">
          By proceeding with the booking, you agree to our{' '}
          <a href="/terms-and-conditions" className="text-blue-400 hover:text-blue-300 underline">
            Terms & Conditions
          </a>
          {' '}and{' '}
          <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
            Privacy Policy
          </a>
          . You will receive training session details via email after successful payment.
        </p>
      </div>

      {/* Book Now Button */}
      <button
        onClick={handleBooking}
        disabled={!isFormValid() || isLoading}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
          isFormValid() && !isLoading
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          `Book Now - ₹${bookingData.totalAmount}`
        )}
      </button>

      {/* Additional Info */}
      <div className="text-center text-sm text-gray-400">
        <p>Secure payment powered by PhonePe</p>
        <p className="mt-1">You will be redirected to PhonePe for payment processing</p>
      </div>
    </div>
  )
}
