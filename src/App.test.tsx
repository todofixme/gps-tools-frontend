import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Root/App Page', () => {
  it('load page', () => {
    render(<App />)

    expect(
      screen.getByText("Drag 'n' drop GPX- or FIT-files, or click to select files."),
    ).toBeInTheDocument()
  })
})
