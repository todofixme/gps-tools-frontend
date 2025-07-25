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
    localStorage.clear() // Clear localStorage before each test to reset language
  })

  it('load page', () => {
    renderWithProviders(<AboutScreen />)
    waitFor(() => {
      expect(screen.getByText('An app dealing with GPS files.')).toBeInTheDocument()
    })
  })

  it('load page german page', async () => {
    renderWithProviders(<AboutScreen />, 'de')

    const germanText = await screen.findByText('Eine Anwendung zum Bearbeiten von GPS-Dateien.')
    expect(germanText).toBeInTheDocument()
  })

  it('show version of backend', async () => {
    renderWithProviders(<AboutScreen />)

    const versionText = await screen.findByText(version)
    expect(versionText).toBeInTheDocument()
    expect(mocks.get).toHaveBeenCalled()
  })
})
