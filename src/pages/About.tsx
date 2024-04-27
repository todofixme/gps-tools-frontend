import { useEffect, useState } from 'react'
import { BackendVersion } from '../@types/common'
import { AxiosResponse } from 'axios'
import API from '../components/common/gps-backend-api'

const NO_VERSION = { app: 'N/A', git: 'N/A' }

const About = () => {
  const [backendVersion, setBackendVersion] =
    useState<BackendVersion>(NO_VERSION)

  const getBackendVersion = async () => {
    try {
      const response: AxiosResponse<BackendVersion> = await API.get('/version')
      setBackendVersion(response.data)
    } catch (error) {
      setBackendVersion(NO_VERSION)
      console.error('Error fetching version: ', error)
    }
  }

  useEffect(() => {
    getBackendVersion()
  }, [])

  return (
    <>
      <h1 className='text-6xl mb-4'>GPS-Tools</h1>
      <p className='mb-4 text-2xl font-light'>An app dealing with GPS files.</p>
      <p className='text-lg'>
        <a
          href='https://github.com/devshred/gps-tools-frontend'
          className='hover:underline'
          target='_blank'
        >
          Frontend Version
        </a>
        :{' '}
        <a
          href='https://github.com/devshred/gps-tools-frontend/releases'
          className='hover:underline'
          target='_blank'
        >
          {import.meta.env.PACKAGE_VERSION}
        </a>
      </p>
      <p className='text-lg'>
        <a
          href='https://github.com/devshred/gps-tools-backend'
          className='hover:underline'
          target='_blank'
        >
          Backend Version
        </a>
        :{' '}
        <a
          href='https://github.com/devshred/gps-tools-backend/releases'
          className='hover:underline'
          target='_blank'
        >
          {backendVersion.app}
        </a>
      </p>
      <p className='text-lg mt-4'>
        This app was created to test some technologies. These are:
      </p>
      <ul className='text-lg mt-4'>
        <li>
          <a
            href='https://react.dev/'
            className='hover:underline'
            target='_blank'
          >
            React
          </a>
          ,{' '}
          <a
            href='https://tailwindcss.com/'
            className='hover:underline'
            target='_blank'
          >
            Tailwind CSS
          </a>
          ,{' '}
          <a
            href='https://daisyui.com/'
            className='hover:underline'
            target='_blank'
          >
            daisyUI
          </a>
        </li>
        <li>
          <a
            href='https://kotlinlang.org/'
            className='hover:underline'
            target='_blank'
          >
            Kotlin
          </a>
          ,{' '}
          <a
            href='https://spring.io/'
            className='hover:underline'
            target='_blank'
          >
            Spring
          </a>
        </li>
        <li>
          <a
            href='https://leafletjs.com/'
            className='hover:underline'
            target='_blank'
          >
            Leaflet
          </a>
          ,{' '}
          <a
            href='https://photon.komoot.io/'
            className='hover:underline'
            target='_blank'
          >
            photon
          </a>
        </li>
      </ul>
      <p className='text-lg mt-4'>
        Contact: gps minus tools ät devshred dot org
      </p>
    </>
  )
}

export default About
