import { useState, useEffect } from 'react'

interface HourSelectorProps {
  onDurationChange: (hours: number, minutes: number, totalAmount: number) => void
  pricePerHour: number
}

export default function HourSelector({ onDurationChange, pricePerHour }: HourSelectorProps) {
  const [hours, setHours] = useState(1)
  const [minutes, setMinutes] = useState(0)
  const [totalAmount, setTotalAmount] = useState(pricePerHour)

  useEffect(() => {
    const totalMinutes = hours * 60 + minutes
    const calculatedAmount = Math.round((totalMinutes / 60) * pricePerHour)
    setTotalAmount(calculatedAmount)
    onDurationChange(hours, minutes, calculatedAmount)
  }, [hours, minutes, pricePerHour])

  const handleHourChange = (value: number) => {
    if (value >= 0 && value <= 24) {
      setHours(value)
    }
  }

  const handleMinuteChange = (value: number) => {
    if (value >= 0 && value < 60) {
      setMinutes(value)
    }
  }

  const presetDurations = [
    { hours: 1, minutes: 0, label: '1 Hour' },
    { hours: 2, minutes: 0, label: '2 Hours' },
    { hours: 4, minutes: 0, label: '4 Hours' },
    { hours: 8, minutes: 0, label: '8 Hours' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">Select Training Duration</h3>
        
        {/* Preset Duration Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {presetDurations.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setHours(preset.hours)
                setMinutes(preset.minutes)
              }}
              className={`px-4 py-3 rounded-lg border transition-all ${
                hours === preset.hours && minutes === preset.minutes
                  ? 'border-blue-500 bg-blue-900/30 text-blue-300'
                  : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
              }`}
            >
              <div className="font-semibold">{preset.label}</div>
              <div className="text-sm opacity-75">
                ₹{Math.round((preset.hours + preset.minutes / 60) * pricePerHour)}
              </div>
            </button>
          ))}
        </div>

        {/* Custom Duration Selector */}
        <div className="bg-gray-800/30 border border-gray-600/50 rounded-lg p-4">
          <h4 className="text-lg font-semibold mb-4 text-white">Custom Duration</h4>
          
          <div className="flex items-center gap-4">
            {/* Hours Selector */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hours
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleHourChange(hours - 1)}
                  disabled={hours <= 0}
                  className="w-10 h-10 rounded-lg border border-gray-600 bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={hours}
                  onChange={(e) => handleHourChange(parseInt(e.target.value) || 0)}
                  className="w-20 text-center bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
                <button
                  onClick={() => handleHourChange(hours + 1)}
                  disabled={hours >= 24}
                  className="w-10 h-10 rounded-lg border border-gray-600 bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            {/* Minutes Selector */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Minutes
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMinuteChange(minutes - 15)}
                  disabled={minutes <= 0}
                  className="w-10 h-10 rounded-lg border border-gray-600 bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  max="59"
                  step="15"
                  value={minutes}
                  onChange={(e) => handleMinuteChange(parseInt(e.target.value) || 0)}
                  className="w-20 text-center bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
                <button
                  onClick={() => handleMinuteChange(minutes + 15)}
                  disabled={minutes >= 45}
                  className="w-10 h-10 rounded-lg border border-gray-600 bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Display */}
      <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-600/50 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-semibold text-white">
              Training Duration: {hours}h {minutes}m
            </div>
            <div className="text-sm text-gray-300">
              ₹{pricePerHour} per hour
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-400">
              ₹{totalAmount}
            </div>
            <div className="text-sm text-gray-300">
              Total Amount
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
