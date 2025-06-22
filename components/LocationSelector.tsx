'use client'

import React from 'react'
import { MapPin, ChevronDown } from 'lucide-react'

interface LocationSelectorProps {
  selectedLocation: string
  onLocationChange: (location: string) => void
}

const locations = [
  { id: 'malibu', name: 'Malibu, CA', coordinates: '34.0259° N, 118.7798° W' },
  { id: 'huntington', name: 'Huntington Beach, CA', coordinates: '33.6595° N, 118.0094° W' },
  { id: 'venice', name: 'Venice Beach, CA', coordinates: '33.9850° N, 118.4695° W' },
  { id: 'manhattan', name: 'Manhattan Beach, CA', coordinates: '33.8847° N, 118.4109° W' },
  { id: 'san-clemente', name: 'San Clemente, CA', coordinates: '33.4269° N, 117.6120° W' },
  { id: 'cardiff', name: 'Cardiff-by-the-Sea, CA', coordinates: '32.9719° N, 117.2791° W' },
  { id: 'oceanside', name: 'Oceanside, CA', coordinates: '33.1959° N, 117.3795° W' },
  { id: 'encinitas', name: 'Encinitas, CA', coordinates: '33.0369° N, 117.2920° W' }
]

export default function LocationSelector({ selectedLocation, onLocationChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const selectedLocationData = locations.find(loc => loc.id === selectedLocation)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="h-6 w-6 text-ocean-600" />
        <h2 className="text-xl font-bold text-gray-800">Location</h2>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-ocean-500" />
            <div className="text-left">
              <p className="font-medium text-gray-800">{selectedLocationData?.name}</p>
              <p className="text-sm text-gray-500">{selectedLocationData?.coordinates}</p>
            </div>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            {locations.map(location => (
              <button
                key={location.id}
                onClick={() => {
                  onLocationChange(location.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors ${
                  selectedLocation === location.id ? 'bg-ocean-50 text-ocean-700' : ''
                }`}
              >
                <MapPin className="h-4 w-4 text-ocean-500" />
                <div className="text-left">
                  <p className="font-medium">{location.name}</p>
                  <p className="text-sm text-gray-500">{location.coordinates}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-ocean-50 p-3 rounded-lg">
          <p className="text-sm text-ocean-600 font-medium">Best Time</p>
          <p className="text-lg font-bold text-ocean-800">6-10 AM</p>
        </div>
        <div className="bg-ocean-50 p-3 rounded-lg">
          <p className="text-sm text-ocean-600 font-medium">Optimal Tide</p>
          <p className="text-lg font-bold text-ocean-800">Mid</p>
        </div>
      </div>

      {/* Current Conditions Summary */}
      <div className="mt-4 p-4 bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-lg text-white">
        <h3 className="font-semibold mb-2">Current Conditions</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-ocean-100">Wave Height</p>
            <p className="font-bold">4.2 ft</p>
          </div>
          <div>
            <p className="text-ocean-100">Wind</p>
            <p className="font-bold">12 mph SW</p>
          </div>
          <div>
            <p className="text-ocean-100">Temperature</p>
            <p className="font-bold">68°F</p>
          </div>
          <div>
            <p className="text-ocean-100">Rating</p>
            <p className="font-bold">⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>
    </div>
  )
} 