import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home Page', () => {
  it('load page', () => {
    render(<Home />)
    expect(screen.getByText('GPS-Tools')).toBeInTheDocument()
  })
})
