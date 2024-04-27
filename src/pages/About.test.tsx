import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from './About'

const mocks = vi.hoisted(() => ({ get: vi.fn() }))

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>()
  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
      })),
    },
  }
  return mockAxios
})

describe('About Page', () => {
  it('load page', () => {
    render(<About />)
    expect(
      screen.getByText('An app dealing with GPS files.')
    ).toBeInTheDocument()
  })

  it('show version of backend', async () => {
    const version = 'v1.2.3'
    mocks.get.mockResolvedValueOnce({
      data: { app: version, git: 'githash' },
    })

    render(<About />)

    expect(await screen.findByText(version)).toBeInTheDocument()
    expect(mocks.get).toHaveBeenCalled()
  })
})
