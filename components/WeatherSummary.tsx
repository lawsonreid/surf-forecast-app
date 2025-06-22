'use client'

import React from 'react'
import { Cloud, Sun, Wind, Thermometer, Droplets } from 'lucide-react'

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

interface WeatherSummaryProps {
  location: string
  forecastData: ForecastData[]
  loading: boolean
}

export default function WeatherSummary({ location, forecastData, loading }: WeatherSummaryProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Cloud className="h-6 w-6 text-ocean-600" />
          <h2 className="text-xl font-bold text-gray-800">Weather Summary</h2>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (forecastData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Cloud className="h-6 w-6 text-ocean-600" />
          <h2 className="text-xl font-bold text-gray-800">Weather Summary</h2>
        </div>
        <p className="text-gray-500">No forecast data available</p>
      </div>
    )
  }

  const today = forecastData[0]
  const weekAverage = forecastData.slice(0, 7).reduce((acc, day) => {
    acc.waveHeight += day.waveHeight
    acc.temperature += day.temperature
    acc.windSpeed += day.windSpeed
    return acc
  }, { waveHeight: 0, temperature: 0, windSpeed: 0 })

  weekAverage.waveHeight /= 7
  weekAverage.temperature /= 7
  weekAverage.windSpeed /= 7

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  }

  const getWeatherIcon = (conditions: string) => {
    switch (conditions.toLowerCase()) {
      case 'good':
        return <Sun className="h-8 w-8 text-yellow-500" />
      case 'fair':
        return <Cloud className="h-8 w-8 text-gray-500" />
      case 'poor':
        return <Cloud className="h-8 w-8 text-gray-700" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Cloud className="h-6 w-6 text-ocean-600" />
        <h2 className="text-xl font-bold text-gray-800">Weather Summary</h2>
      </div>

      {/* Today's Weather */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Conditions</h3>
        <div className="bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-ocean-100 text-sm">Current Weather</p>
              <p className="text-2xl font-bold">{today.conditions}</p>
            </div>
            {getWeatherIcon(today.conditions)}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Thermometer className="h-5 w-5 text-ocean-200" />
              <div>
                <p className="text-ocean-100 text-xs">Temperature</p>
                <p className="font-semibold">{today.temperature.toFixed(0)}°F</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Wind className="h-5 w-5 text-ocean-200" />
              <div>
                <p className="text-ocean-100 text-xs">Wind</p>
                <p className="font-semibold">{today.windSpeed.toFixed(0)} mph {getWindDirection(today.windDirection)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-ocean-200" />
              <div>
                <p className="text-ocean-100 text-xs">Tide</p>
                <p className="font-semibold">{today.tide.toFixed(1)} ft</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-ocean-200 rounded-full"></div>
              <div>
                <p className="text-ocean-100 text-xs">Rating</p>
                <p className="font-semibold">{'⭐'.repeat(today.rating)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Average */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">This Week's Average</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Wave Height</p>
            <p className="text-xl font-bold text-ocean-600">{weekAverage.waveHeight.toFixed(1)} ft</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="text-xl font-bold text-red-600">{weekAverage.temperature.toFixed(0)}°F</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="text-xl font-bold text-gray-600">{weekAverage.windSpeed.toFixed(0)} mph</p>
          </div>
        </div>
      </div>

      {/* Best Days */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Best Surf Days This Week</h3>
        <div className="space-y-2">
          {forecastData
            .slice(0, 7)
            .filter(day => day.rating >= 4)
            .slice(0, 3)
            .map((day, index) => (
              <div key={day.date} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-sm text-gray-600">{day.waveHeight.toFixed(1)}ft waves</span>
                </div>
                <span className="text-green-600 font-bold">{'⭐'.repeat(day.rating)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
} 