'use client'

import React from 'react'
import { format, addDays } from 'date-fns'
import { Waves, Wind, Thermometer, Star } from 'lucide-react'

interface ForecastData {
  date: string
  waveHeight: number
  windSpeed: number
  windDirection: number
  swellDirection: number
  tide: number
  temperature: number
  conditions: string
  rating: number
}

interface SurfForecastProps {
  forecastData: ForecastData[]
  loading: boolean
}

export default function SurfForecast({ forecastData, loading }: SurfForecastProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Waves className="h-6 w-6 text-ocean-600" />
          <h2 className="text-xl font-bold text-gray-800">14-Day Surf Forecast</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  const getWaveColor = (height: number) => {
    if (height < 3) return 'text-green-600'
    if (height < 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Good': return 'bg-green-100 text-green-800'
      case 'Fair': return 'bg-yellow-100 text-yellow-800'
      case 'Poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Waves className="h-6 w-6 text-ocean-600" />
        <h2 className="text-xl font-bold text-gray-800">14-Day Surf Forecast</h2>
      </div>
      
      <div className="space-y-4">
        {forecastData.map((day, index) => (
          <div key={day.date} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-gray-600">
                  {format(new Date(day.date), 'EEE, MMM d')}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(day.conditions)}`}>
                  {day.conditions}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < day.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Waves className="h-4 w-4 text-ocean-500" />
                <span className={`font-semibold ${getWaveColor(day.waveHeight)}`}>
                  {day.waveHeight.toFixed(1)}ft
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {day.windSpeed.toFixed(0)}mph
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-600">
                  {day.temperature.toFixed(0)}°F
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  {day.tide.toFixed(1)}ft tide
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 