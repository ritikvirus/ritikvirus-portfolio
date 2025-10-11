import { useState } from 'react'

interface UserDetailsFormProps {
  onDetailsChange: (details: {
    name: string
    email: string
    phone: string
  }) => void
}

export default function UserDetailsForm({ onDetailsChange }: UserDetailsFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const handleInputChange = (field: string, value: string) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }

    // Validate and update parent component
    onDetailsChange(newFormData)
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
  }

  const handleBlur = (field: string, value: string) => {
    let error = ''
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required'
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters'
        }
        break
      case 'email':
        if (!value.trim()) {
          error = 'Email is required'
        } else if (!validateEmail(value)) {
          error = 'Please enter a valid email address'
        }
        break
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required'
        } else if (!validatePhone(value)) {
          error = 'Please enter a valid 10-digit mobile number'
        }
        break
    }
    
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      validateEmail(formData.email) &&
      validatePhone(formData.phone) &&
      !Object.values(errors).some(error => error !== '')
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Your Details</h3>
      
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={(e) => handleBlur('name', e.target.value)}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
              errors.name 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-600 focus:ring-blue-500/50'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={(e) => handleBlur('email', e.target.value)}
            placeholder="Enter your email address"
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
              errors.email 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-600 focus:ring-blue-500/50'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Mobile Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={(e) => handleBlur('phone', e.target.value)}
            placeholder="Enter your 10-digit mobile number"
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
              errors.phone 
                ? 'border-red-500 focus:ring-red-500/50' 
                : 'border-gray-600 focus:ring-blue-500/50'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Form Validation Indicator */}
      <div className={`p-3 rounded-lg ${
        isFormValid() 
          ? 'bg-green-900/20 border border-green-600/30' 
          : 'bg-yellow-900/20 border border-yellow-600/30'
      }`}>
        <p className={`text-sm ${
          isFormValid() ? 'text-green-300' : 'text-yellow-300'
        }`}>
          {isFormValid() 
            ? '✓ All details are valid' 
            : 'Please fill in all required fields correctly'
          }
        </p>
      </div>
    </div>
  )
}
