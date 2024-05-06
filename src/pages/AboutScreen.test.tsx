import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import AboutScreen from './AboutScreen'
import React from 'react'
import { LanguageProvider } from '../components/services/providers/language/LanguageProvider'
import { Language } from '../@types/language'

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
  const renderWithLanguage = (
    children: React.ReactNode,
    language: Language = 'en'
  ) => {
    render(<LanguageProvider language={language}>{children}</LanguageProvider>)
  }

  it('load page', () => {
    renderWithLanguage(<AboutScreen />)
    expect(
      screen.getByText('An app dealing with GPS files.')
    ).toBeInTheDocument()
  })

  it('load page german page', () => {
    renderWithLanguage(<AboutScreen />, 'de')
    expect(
      screen.getByText('Eine Anwendung zum Bearbeiten von GPS-Dateien.')
    ).toBeInTheDocument()
  })

  it('show version of backend', async () => {
    const version = 'v1.2.3'
    mocks.get.mockResolvedValueOnce({
      data: { app: version, git: 'githash' },
    })

    renderWithLanguage(<AboutScreen />)

    expect(await screen.findByText(version)).toBeInTheDocument()
    expect(mocks.get).toHaveBeenCalled()
  })
})
