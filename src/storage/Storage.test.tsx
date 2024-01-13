import React from 'react'
import { render, screen } from '@testing-library/react'
import Storage from './Storage'

test('prompts for ingest of todo data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Ingest todos:")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for download of todo data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Download todos")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for ingest of event data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Ingest events:")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for download of event data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Download events")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for ingest of project data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Ingest projects:")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for download of project data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Download projects")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for ingest of task data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Ingest tasks:")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for download of task data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Download tasks")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for ingest of track data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Ingest tracks:")
  expect(linkElement).toBeInTheDocument()
})

test('prompts for download of track data', () => {
  render(<Storage />)

  const linkElement = screen.getByText("Download tracks")
  expect(linkElement).toBeInTheDocument()
})
