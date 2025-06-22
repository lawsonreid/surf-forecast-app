'use client'

import React, { useState, useEffect } from 'react'
import { DollarSign, TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react'

interface RevenueEntry {
  id: string
  date: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
}

export default function RevenueTracker() {
  const [entries, setEntries] = useState<RevenueEntry[]>([])
  const [newEntry, setNewEntry] = useState({
    type: 'income' as 'income' | 'expense',
    category: '',
    amount: '',
    description: ''
  })
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // Load mock data
    const mockEntries: RevenueEntry[] = [
      {
        id: '1',
        date: '2024-01-15',
        type: 'income',
        category: 'Surf Lessons',
        amount: 150,
        description: 'Private lesson - Malibu'
      },
      {
        id: '2',
        date: '2024-01-15',
        type: 'income',
        category: 'Equipment Rental',
        amount: 75,
        description: 'Board rental - 2 hours'
      },
      {
        id: '3',
        date: '2024-01-14',
        type: 'expense',
        category: 'Equipment',
        amount: 45,
        description: 'New leash'
      },
      {
        id: '4',
        date: '2024-01-14',
        type: 'income',
        category: 'Surf Lessons',
        amount: 200,
        description: 'Group lesson - 4 students'
      }
    ]
    setEntries(mockEntries)
  }, [])

  const addEntry = () => {
    if (!newEntry.category || !newEntry.amount || !newEntry.description) return

    const entry: RevenueEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: newEntry.type,
      category: newEntry.category,
      amount: parseFloat(newEntry.amount),
      description: newEntry.description
    }

    setEntries([entry, ...entries])
    setNewEntry({ type: 'income', category: '', amount: '', description: '' })
    setShowForm(false)
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const totalIncome = entries
    .filter(entry => entry.type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0)

  const totalExpenses = entries
    .filter(entry => entry.type === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0)

  const netRevenue = totalIncome - totalExpenses

  const categories = [
    'Surf Lessons',
    'Equipment Rental',
    'Equipment',
    'Transportation',
    'Insurance',
    'Marketing',
    'Other'
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <DollarSign className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-bold text-gray-800">Revenue Tracker</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Income</span>
          </div>
          <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-800">Expenses</span>
          </div>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className={`p-4 rounded-lg ${netRevenue >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
          <div className="flex items-center space-x-2">
            <DollarSign className={`h-5 w-5 ${netRevenue >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            <span className={`text-sm font-medium ${netRevenue >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>Net</span>
          </div>
          <p className={`text-2xl font-bold ${netRevenue >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            ${netRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Add Entry Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full mb-4 bg-ocean-600 text-white py-2 px-4 rounded-lg hover:bg-ocean-700 transition-colors flex items-center justify-center space-x-2"
      >
        <Plus className="h-4 w-4" />
        <span>Add Entry</span>
      </button>

      {/* Add Entry Form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={newEntry.type}
                onChange={(e) => setNewEntry({...newEntry, type: e.target.value as 'income' | 'expense'})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={newEntry.category}
                onChange={(e) => setNewEntry({...newEntry, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                value={newEntry.amount}
                onChange={(e) => setNewEntry({...newEntry, amount: e.target.value})}
                placeholder="0.00"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={newEntry.description}
                onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                placeholder="Brief description"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={addEntry}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Add Entry
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 mb-3">Recent Entries</h3>
        {entries.slice(0, 10).map(entry => (
          <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  entry.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {entry.type}
                </span>
                <span className="font-medium text-gray-800">{entry.category}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
              <p className="text-xs text-gray-500">{entry.date}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`font-bold ${
                entry.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {entry.type === 'income' ? '+' : '-'}${entry.amount.toFixed(2)}
              </span>
              <button
                onClick={() => deleteEntry(entry.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 