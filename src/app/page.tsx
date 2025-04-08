import Link from 'next/link'
import { TripForm } from '@/components/TripForm'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 sm:p-24 bg-ctp-base">
      <div className="w-full max-w-5xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-ctp-text">
            Your next trip,{' '}
            <span className="text-ctp-mauve">beautifully planned.</span>
          </h1>
          <p className="text-xl text-ctp-subtext0 max-w-2xl mx-auto">
            Create and share travel itineraries with a clean, minimal interface.
            Perfect for solo adventures or group trips.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4 pt-8">
          <TripForm />

          <Link
            href="/trip/tokyo-2024"
            className="text-ctp-subtext1 hover:text-ctp-mauve transition-colors"
          >
            View example trip →
          </Link>
        </div>
      </div>
    </main>
  )
}
