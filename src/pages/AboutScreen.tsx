import { useEffect, useState } from 'react'
import { BackendVersion } from '../@types/common'
import { AxiosResponse } from 'axios'
import API from '../components/services/backend/gps-backend-api'
import useLanguage from '../hooks/useLanguage'

const NO_VERSION = { app: 'N/A', git: 'N/A' }

const AboutScreen = () => {
  const { getMessage } = useLanguage()

  const [backendVersion, setBackendVersion] = useState<BackendVersion>(NO_VERSION)

  const fetchBackendVersion = async () => {
    try {
      const response: AxiosResponse<BackendVersion> = await API.get('/version')
      setBackendVersion(response.data)
    } catch (fetchError) {
      setBackendVersion(NO_VERSION)
      console.error('Error fetching version: ', fetchError)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchBackendVersion()
    })()
  }, [])

  return (
    <>
      <h1 className="text-6xl mb-4">GPS-Tools</h1>
      <p className="mb-4 text-2xl font-light">{getMessage('app_description')}</p>
      <p className="text-lg">
        <a
          href="https://github.com/devshred/gps-tools-frontend"
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Version
        </a>
        :{' '}
        <a
          href="https://github.com/devshred/gps-tools-frontend/releases"
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {import.meta.env.PACKAGE_VERSION}
        </a>
      </p>
      <p className="text-lg">
        <a
          href="https://github.com/devshred/gps-tools-backend"
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Backend Version
        </a>
        :{' '}
        <a
          href="https://github.com/devshred/gps-tools-backend/releases"
          className="hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          {backendVersion.app}
        </a>
      </p>
      <p className="text-lg mt-4">{getMessage('technologies_header')}</p>
      <ul className="text-lg mt-4">
        <li>
          <a href="https://react.dev/" className="hover:underline" target="_blank" rel="noreferrer">
            React
          </a>
          ,{' '}
          <a
            href="https://tailwindcss.com/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Tailwind CSS
          </a>
          ,{' '}
          <a
            href="https://daisyui.com/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            daisyUI
          </a>
        </li>
        <li>
          <a
            href="https://kotlinlang.org/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Kotlin
          </a>
          ,{' '}
          <a href="https://spring.io/" className="hover:underline" target="_blank" rel="noreferrer">
            Spring
          </a>
        </li>
        <li>
          <a
            href="https://leafletjs.com/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Leaflet
          </a>
          ,{' '}
          <a
            href="https://photon.komoot.io/"
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            photon
          </a>
        </li>
      </ul>
      <p className="text-lg mt-4">{getMessage('contact')}: gps minus tools ät tigerflanke dot de</p>
    </>
  )
}

export default AboutScreen
