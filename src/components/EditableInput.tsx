'use client'

interface EditableInputProps {
  value: string
  className?: string
  onChange?: (value: string) => void
}

export function EditableInput({ value, className = '', onChange }: EditableInputProps) {
  return (
    <input
      type="text"
      value={value}
      className={`bg-transparent border-0 text-ctp-text focus:outline-none focus:ring-0 w-full ${className}`}
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
} 