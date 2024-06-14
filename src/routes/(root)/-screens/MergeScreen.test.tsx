import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Providers from '../../../services/providers'
import MergeScreen from './MergeScreen'

describe('Root/Merge Screen', () => {
  it('load page', () => {
    render(
      <Providers>
        <MergeScreen />
      </Providers>,
    )

    expect(
      screen.getByText("Drag 'n' drop GPX- or FIT-files, or click to select files."),
    ).toBeInTheDocument()
  })
})
