import React, { useState, useEffect } from 'react'

interface BookingFormData {
  name: string
  email: string
  phone: string
  hours: number
  minutes: number
  totalAmount: number
  paymentMethod: 'phonepe' | 'payu'
}

interface BookingFormProps {
  className?: string
}

export default function TrainingBookingForm({ className = '' }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    hours: 1,
    minutes: 0,
    totalAmount: 500,
    paymentMethod: 'phonepe'
  })

  const [errors, setErrors] = useState<Partial<BookingFormData>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isValid, setIsValid] = useState(false)

  // Calculate total amount whenever hours or minutes change
  useEffect(() => {
    const totalHours = formData.hours + (formData.minutes / 60)
    const newAmount = Math.round(totalHours * 500)
    setFormData(prev => ({ ...prev, totalAmount: newAmount }))
  }, [formData.hours, formData.minutes])

  // Validate form
  useEffect(() => {
    const nameValid = formData.name.trim().length >= 2
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    const phoneValid = /^[6-9]\d{9}$/.test(formData.phone)
    const durationValid = formData.hours >= 1 && formData.hours <= 100
    const amountValid = formData.totalAmount >= 500

    setIsValid(nameValid && emailValid && phoneValid && durationValid && amountValid)
  }, [formData])

  const handleInputChange = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateField = (field: keyof BookingFormData, value: string | number): string | undefined => {
    switch (field) {
      case 'name':
        if (!value || (value as string).trim().length < 2) {
          return 'Name must be at least 2 characters'
        }
        break
      case 'email':
        if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
          return 'Please enter a valid email address'
        }
        break
      case 'phone':
        if (!value || !/^[6-9]\d{9}$/.test(value as string)) {
          return 'Please enter a valid 10-digit phone number'
        }
        break
      case 'hours':
        if (!value || (value as number) < 1 || (value as number) > 100) {
          return 'Hours must be between 1 and 100'
        }
        break
    }
    return undefined
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isValid) return

    setIsLoading(true)
    setErrors({})

    try {
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        })
      })

      const result = await response.json()

      if (result.success && result.paymentUrl) {
        // Redirect to PhonePe payment page
        window.location.href = result.paymentUrl
      } else {
        setErrors({ email: result.message || 'Payment initiation failed' })
      }
    } catch (error) {
      console.error('Booking error:', error)
      setErrors({ email: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className={`bg-zinc-800/50 p-8 rounded-xl border border-zinc-700 ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Details Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-100 mb-4">Your Details</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 bg-zinc-900 border rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-colors ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-zinc-700 focus:ring-emerald-500/20 focus:border-emerald-400'
              }`}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-zinc-900 border rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-colors ${
                errors.email 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-zinc-700 focus:ring-emerald-500/20 focus:border-emerald-400'
              }`}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 bg-zinc-900 border rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-colors ${
                errors.phone 
                  ? 'border-red-500 focus:ring-red-500/20' 
                  : 'border-zinc-700 focus:ring-emerald-500/20 focus:border-emerald-400'
              }`}
              placeholder="9876543210"
              maxLength={10}
              required
            />
            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
          </div>
        </div>

        {/* Duration Selector */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-100 mb-4">Training Duration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="hours" className="block text-sm font-medium text-zinc-300 mb-2">
                Hours
              </label>
              <input
                type="number"
                id="hours"
                min="1"
                max="100"
                value={formData.hours}
                onChange={(e) => handleInputChange('hours', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="minutes" className="block text-sm font-medium text-zinc-300 mb-2">
                Minutes
              </label>
              <select
                id="minutes"
                value={formData.minutes}
                onChange={(e) => handleInputChange('minutes', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors"
              >
                <option value={0}>0 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
              </select>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
            <p className="text-emerald-300 font-semibold text-center">
              {formData.hours} hour{formData.hours !== 1 ? 's' : ''} {formData.minutes > 0 && `${formData.minutes} minutes`} = {formatAmount(formData.totalAmount)}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-zinc-100 mb-4">Payment Method</h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="phonepe"
                checked={formData.paymentMethod === 'phonepe'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value as 'phonepe' | 'payu')}
                className="text-emerald-500 focus:ring-emerald-500"
              />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">PP</span>
                </div>
                <span className="text-zinc-300">PhonePe</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="payu"
                checked={formData.paymentMethod === 'payu'}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value as 'phonepe' | 'payu')}
                className="text-emerald-500 focus:ring-emerald-500"
              />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">PY</span>
                </div>
                <span className="text-zinc-300">PayU</span>
              </div>
            </label>
          </div>
        </div>

        {/* Total & Submit */}
        <div className="space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-zinc-100">Total Amount</span>
              <span className="text-3xl font-bold text-emerald-400">{formatAmount(formData.totalAmount)}</span>
            </div>
            <p className="text-sm text-zinc-400 mt-2">You'll be redirected to secure payment gateway</p>
          </div>

          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-colors ${
              isValid && !isLoading
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Processing...' : `Proceed to Payment - ${formatAmount(formData.totalAmount)}`}
          </button>
        </div>
      </form>
    </div>
  )
}
