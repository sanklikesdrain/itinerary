'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlaneTakeoff } from 'lucide-react'

export function TripForm() {
  const router = useRouter()
  const [tripName, setTripName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!tripName) return

    try {
      setIsLoading(true)
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: tripName,
          description,
          startDate,
          endDate,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create trip')
      }

      // Create a URL-friendly slug from the trip name
      const slug = tripName.toLowerCase().replace(/\s+/g, '-')
      router.push(`/trip/${slug}`)
    } catch (error) {
      console.error('Error creating trip:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-ctp-text">
          Trip Name
        </label>
        <input
          id="name"
          type="text"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
          placeholder="e.g., Tokyo 2024"
          className="w-full rounded-lg bg-ctp-surface0 px-4 py-3 text-ctp-text placeholder:text-ctp-overlay0 border-2 border-ctp-surface1 focus:border-ctp-mauve focus:outline-none"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-ctp-text">
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us about your trip..."
          className="w-full rounded-lg bg-ctp-surface0 px-4 py-3 text-ctp-text placeholder:text-ctp-overlay0 border-2 border-ctp-surface1 focus:border-ctp-mauve focus:outline-none min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="startDate" className="block text-sm font-medium text-ctp-text">
            Start Date (optional)
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg bg-ctp-surface0 px-4 py-3 text-ctp-text placeholder:text-ctp-overlay0 border-2 border-ctp-surface1 focus:border-ctp-mauve focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-ctp-text">
            End Date (optional)
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg bg-ctp-surface0 px-4 py-3 text-ctp-text placeholder:text-ctp-overlay0 border-2 border-ctp-surface1 focus:border-ctp-mauve focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-ctp-mauve px-6 py-3 font-medium text-ctp-base hover:bg-ctp-pink transition-colors disabled:opacity-50"
      >
        <PlaneTakeoff className="h-5 w-5" />
        {isLoading ? 'Creating...' : 'Start Planning'}
      </button>
    </form>
  )
} 