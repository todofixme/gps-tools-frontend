import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import AboutScreen from './AboutScreen'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { changeLanguage } from 'i18next'

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
  const queryClient = new QueryClient()
  const renderWithProviders = (children: React.ReactNode) => {
    render(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>)
  }

  const version = 'v1.2.3'
  beforeEach(() => {
    mocks.get.mockResolvedValueOnce({
      data: { app: version, git: 'githash' },
    })
  })

  it('load page with default language', () => {
    renderWithProviders(<AboutScreen />)
    expect(screen.getByText('An app dealing with GPS files.')).toBeInTheDocument()
  })

  it('load german page', () => {
    changeLanguage('de-DE')
    renderWithProviders(<AboutScreen />)
    expect(screen.getByText('Eine Anwendung zum Bearbeiten von GPS-Dateien.')).toBeInTheDocument()
  })

  it('load english page', () => {
    changeLanguage('en-GB')
    renderWithProviders(<AboutScreen />)
    expect(screen.getByText('An app dealing with GPS files.')).toBeInTheDocument()
  })

  it('show version of backend', () => {
    renderWithProviders(<AboutScreen />)

    waitFor(async () => {
      expect(await screen.findByText('dsfav')).toBeInTheDocument()
      expect(mocks.get).toHaveBeenCalled()
    })
  })
})
