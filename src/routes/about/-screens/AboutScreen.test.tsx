import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import AboutScreen from './AboutScreen'
import React from 'react'
import { LanguageProvider } from '../../../services/providers/language/LanguageProvider'
import { Language } from '../../../@types/language'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
  const renderWithProviders = (children: React.ReactNode, language: Language = 'en') => {
    render(
      <QueryClientProvider client={queryClient}>
        <LanguageProvider initialLanguage={language}>{children}</LanguageProvider>
      </QueryClientProvider>,
    )
  }

  const version = 'v1.2.3'
  beforeEach(() => {
    mocks.get.mockResolvedValueOnce({
      data: { app: version, git: 'githash' },
    })
  })

  it('load page', () => {
    renderWithProviders(<AboutScreen />)
    waitFor(() => {
      expect(screen.getByText('An app dealing with GPS files.')).toBeInTheDocument()
    })
  })

  it('load page german page', () => {
    renderWithProviders(<AboutScreen />, 'de')
    waitFor(() => {
      expect(screen.getByText('Eine Anwendung zum Bearbeiten von GPS-Dateien.')).toBeInTheDocument()
    })
  })

  it('show version of backend', () => {
    renderWithProviders(<AboutScreen />)

    waitFor(async () => {
      expect(await screen.findByText(version)).toBeInTheDocument()
      expect(mocks.get).toHaveBeenCalled()
    })
  })
})
