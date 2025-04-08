import { Calendar, Share2 } from 'lucide-react'

interface TripDay {
  id: string
  title: string
  notes: {
    id: string
    type: 'text' | 'checklist' | 'place'
    content: string
    checked?: boolean
    emoji?: string
  }[]
}

const mockTrip: TripDay[] = [
  {
    id: '1',
    title: 'Day 1: Tokyo',
    notes: [
      {
        id: '1-1',
        type: 'place',
        content: 'Visit Meiji Shrine',
        emoji: '⛩️'
      },
      {
        id: '1-2',
        type: 'place',
        content: 'Shibuya Scramble + Lunch',
        emoji: '🚶'
      },
      {
        id: '1-3',
        type: 'place',
        content: 'Ramen at Ichiran',
        emoji: '🍜'
      }
    ]
  }
]

export default function PublicTripPage({ params }: { params: { slug: string } }) {
  const tripName = decodeURIComponent(params.slug).split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return (
    <div className="min-h-screen bg-ctp-base">
      <header className="border-b border-ctp-surface0">
        <div className="max-w-4xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ctp-text">{tripName}</h1>
            <p className="text-ctp-subtext1">
              Created on {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-ctp-text hover:bg-ctp-surface0 transition-colors">
              <Calendar className="h-4 w-4" />
              Add to Calendar
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ctp-mauve text-ctp-base hover:bg-ctp-pink transition-colors">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-12">
        {mockTrip.map((day) => (
          <section
            key={day.id}
            id={`day-${day.id}`}
            className="mb-12 space-y-4"
          >
            <h2 className="text-2xl font-semibold text-ctp-text">
              {day.title}
            </h2>
            
            <div className="space-y-3 pl-4">
              {day.notes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-ctp-surface0"
                >
                  {note.type === 'place' && (
                    <span className="text-xl">{note.emoji}</span>
                  )}
                  <p className="text-ctp-text">{note.content}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
} 