import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutScreen from './AboutScreen.tsx'

const mocks = vi.hoisted(() => ({ get: vi.fn() }))

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>()
  return {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
      })),
    },
  }
})

describe('About Page', () => {
  it('load page', () => {
    render(<AboutScreen />)
    expect(
      screen.getByText('An app dealing with GPS files.')
    ).toBeInTheDocument()
  })

  it('show version of backend', async () => {
    const version = 'v1.2.3'
    mocks.get.mockResolvedValueOnce({
      data: { app: version, git: 'githash' },
    })

    render(<AboutScreen />)

    expect(await screen.findByText(version)).toBeInTheDocument()
    expect(mocks.get).toHaveBeenCalled()
  })
})
