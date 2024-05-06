import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomeScreen from './HomeScreen'

describe('Home Page', () => {
  it('load page', () => {
    render(<HomeScreen />)
    expect(screen.getByText('GPS-Tools')).toBeInTheDocument()
  })
})
