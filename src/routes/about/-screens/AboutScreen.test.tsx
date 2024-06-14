import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import AboutScreen from './AboutScreen'
import React from 'react'
import { LanguageProvider } from '../../../services/providers/language/LanguageProvider'
import { Language } from '../../../@types/language'

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
  const renderWithLanguage = (children: React.ReactNode, language: Language = 'en') => {
    render(<LanguageProvider language={language}>{children}</LanguageProvider>)
  }

  const version = 'v1.2.3'
  beforeEach(() => {
    mocks.get.mockResolvedValueOnce({
      data: { app: version, git: 'githash' },
    })
  })

  it('load page', () => {
    renderWithLanguage(<AboutScreen />)
    waitFor(() => {
      expect(screen.getByText('An app dealing with GPS files.')).toBeInTheDocument()
    })
  })

  it('load page german page', () => {
    renderWithLanguage(<AboutScreen />, 'de')
    waitFor(() => {
      expect(screen.getByText('Eine Anwendung zum Bearbeiten von GPS-Dateien.')).toBeInTheDocument()
    })
  })

  it('show version of backend', () => {
    renderWithLanguage(<AboutScreen />)

    waitFor(async () => {
      expect(await screen.findByText(version)).toBeInTheDocument()
      expect(mocks.get).toHaveBeenCalled()
    })
  })
})
