'use client'

import { TripEditor } from '@/components/TripEditor'

export default function TripPage({ params }: { params: { slug: string } }) {
  const tripName = decodeURIComponent(params.slug).split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  // TODO: Fetch trip details from API
  const mockTrip = {
    name: tripName,
    description: '',
    startDate: '',
    endDate: '',
  }

  return <TripEditor initialTripName={tripName} initialTrip={[]} />
} 