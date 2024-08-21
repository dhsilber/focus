import { render, screen } from '@testing-library/react'
import { Event } from '../DoData'
import EventElement from './EventElement'

const data: Event[] = [
  { id: 1, text: "demo event", start: 1663025400000, duration: 900000 },
  { id: 2, text: "another event", start: 1663104600000, duration: 8220000 },
  { id: 3, text: "third event", start: 1663112820000, duration: 780000 },
]

test('Renders single event', () => {
  render(<EventElement index={0} events={data} />)

  expect(screen.getByText("Monday")).toBeInTheDocument()
  expect(screen.getByText(/19:30/)).toBeInTheDocument()
  expect(screen.getByText(/demo event/)).toBeInTheDocument()
  expect(screen.getByText(/19:45/)).toBeInTheDocument()
})

test('second of events on sequential days', () => {
  render(<EventElement index={1} events={data} />)

  expect(screen.getByText("Tuesday")).toBeInTheDocument()
  expect(screen.getByText(/17:30/)).toBeInTheDocument()
  expect(screen.getByText(/another event/)).toBeInTheDocument()
})

test('event starting at end time of previous event', () => {
  render(<EventElement index={2} events={data} />)

  expect(screen.getByText(/19:47/)).toBeInTheDocument()
  expect(screen.getByText(/third event/)).toBeInTheDocument()
  expect(screen.getByText(/20:00/)).toBeInTheDocument()
})
