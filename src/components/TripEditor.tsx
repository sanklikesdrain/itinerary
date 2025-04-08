'use client'

import { useState } from 'react'
import { Calendar, Share2, Download } from 'lucide-react'
import { EditableInput } from './EditableInput'

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

interface TripEditorProps {
  initialTripName: string
  initialTrip: TripDay[]
}

export function TripEditor({ initialTripName, initialTrip }: TripEditorProps) {
  const [tripName, setTripName] = useState(initialTripName)
  const [days, setDays] = useState<TripDay[]>(initialTrip)
  const [newDayTitle, setNewDayTitle] = useState('')

  const addDay = () => {
    if (!newDayTitle) return

    const newDay: TripDay = {
      id: crypto.randomUUID(),
      title: newDayTitle,
      notes: [],
    }

    setDays([...days, newDay])
    setNewDayTitle('')
  }

  const addNote = (dayId: string, type: 'text' | 'checklist' | 'place' = 'text') => {
    const newNote = {
      id: crypto.randomUUID(),
      type,
      content: '',
      emoji: type === 'place' ? '📍' : undefined,
    }

    setDays(
      days.map((day) =>
        day.id === dayId
          ? { ...day, notes: [...day.notes, newNote] }
          : day
      )
    )
  }

  const updateNote = (dayId: string, noteId: string, content: string) => {
    setDays(
      days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              notes: day.notes.map((note) =>
                note.id === noteId ? { ...note, content } : note
              ),
            }
          : day
      )
    )
  }

  const updateDayTitle = (dayId: string, title: string) => {
    setDays(
      days.map((day) =>
        day.id === dayId ? { ...day, title } : day
      )
    )
  }

  return (
    <div className="flex h-screen bg-ctp-base">
      {/* Sidebar */}
      <aside className="w-64 border-r border-ctp-surface0 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-ctp-text">Overview</h2>
          <button className="text-ctp-subtext0 hover:text-ctp-text">
            <Calendar className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 space-y-2">
          {days.map((day) => (
            <a
              key={day.id}
              href={`#day-${day.id}`}
              className="block px-3 py-2 rounded-lg text-ctp-text hover:bg-ctp-surface0 transition-colors"
            >
              {day.title}
            </a>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newDayTitle}
              onChange={(e) => setNewDayTitle(e.target.value)}
              placeholder="New day title..."
              className="flex-1 px-3 py-2 rounded-lg bg-ctp-surface0 text-ctp-text placeholder:text-ctp-overlay0 focus:outline-none focus:ring-1 focus:ring-ctp-mauve"
            />
            <button
              onClick={addDay}
              className="px-3 py-2 rounded-lg bg-ctp-mauve text-ctp-base hover:bg-ctp-pink transition-colors"
            >
              Add
            </button>
          </div>
        </nav>

        <div className="border-t border-ctp-surface0 pt-4 space-y-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-ctp-text hover:bg-ctp-surface0 transition-colors">
            <Share2 className="h-4 w-4" />
            Share Trip
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-ctp-text hover:bg-ctp-surface0 transition-colors">
            <Download className="h-4 w-4" />
            Export as PDF
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className="mb-12">
            <EditableInput
              value={tripName}
              className="text-4xl font-bold"
              onChange={setTripName}
            />
            <p className="text-ctp-subtext1">
              Created on {new Date().toLocaleDateString()}
            </p>
          </div>

          {days.map((day) => (
            <section
              key={day.id}
              id={`day-${day.id}`}
              className="mb-12 space-y-4"
            >
              <EditableInput
                value={day.title}
                className="text-2xl font-semibold"
                onChange={(value) => updateDayTitle(day.id, value)}
              />
              
              <div className="space-y-3 pl-4">
                {day.notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-ctp-surface0 transition-colors group"
                  >
                    {note.type === 'place' && (
                      <span className="text-xl">{note.emoji}</span>
                    )}
                    <EditableInput
                      value={note.content}
                      onChange={(value) => updateNote(day.id, note.id, value)}
                    />
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => addNote(day.id, 'text')}
                    className="px-3 py-2 text-ctp-subtext1 hover:text-ctp-text transition-colors"
                  >
                    + Add text
                  </button>
                  <button
                    onClick={() => addNote(day.id, 'place')}
                    className="px-3 py-2 text-ctp-subtext1 hover:text-ctp-text transition-colors"
                  >
                    + Add place
                  </button>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
} 