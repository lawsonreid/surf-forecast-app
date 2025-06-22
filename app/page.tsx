'use client'

import React, { useState, useEffect } from 'react'
import { Waves, TrendingUp, DollarSign, Calendar, MapPin } from 'lucide-react'
import SurfForecast from '@/components/SurfForecast'
import RevenueTracker from '@/components/RevenueTracker'
import LocationSelector from '@/components/LocationSelector'
import WeatherSummary from '@/components/WeatherSummary'

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState('malibu')
  const [forecastData, setForecastData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call for forecast data
    setTimeout(() => {
      setForecastData(generateMockForecastData())
      setLoading(false)
    }, 1000)
  }, [selectedLocation])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="ocean-gradient text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Waves className="h-8 w-8 animate-wave" />
              <h1 className="text-3xl font-bold">Surf Forecast Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <TrendingUp className="h-6 w-6" />
              <span className="text-lg font-semibold">Revenue Tracker</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Location & Summary */}
          <div className="lg:col-span-1 space-y-6">
            <LocationSelector 
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />
            <WeatherSummary 
              location={selectedLocation}
              forecastData={forecastData}
              loading={loading}
            />
          </div>

          {/* Center Column - Surf Forecast */}
          <div className="lg:col-span-1">
            <SurfForecast 
              forecastData={forecastData}
              loading={loading}
            />
          </div>

          {/* Right Column - Revenue Tracker */}
          <div className="lg:col-span-1">
            <RevenueTracker />
          </div>
        </div>
      </main>
    </div>
  )
}

// Mock data generator
function generateMockForecastData() {
  const data = []
  const today = new Date()
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    data.push({
      date: date.toISOString().split('T')[0],
      waveHeight: Math.random() * 8 + 2, // 2-10 feet
      windSpeed: Math.random() * 20 + 5, // 5-25 mph
      windDirection: Math.random() * 360, // 0-360 degrees
      swellDirection: Math.random() * 360,
      tide: Math.random() * 4 + 2, // 2-6 feet
      temperature: Math.random() * 15 + 60, // 60-75°F
      conditions: ['Good', 'Fair', 'Poor'][Math.floor(Math.random() * 3)],
      rating: Math.floor(Math.random() * 5) + 1, // 1-5 stars
    })
  }
  
  return data
} 