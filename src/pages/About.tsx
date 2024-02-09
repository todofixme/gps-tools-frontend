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
      <h1 className='text-6xl mb-4'>GPS Tools</h1>
      <p className='mb-4 text-2xl font-light'>An app dealing with GPS files.</p>
      <p className='text-lg'>Frontend Version: 1.0.0</p>
      <p className='text-lg'>Backend Version: {backendVersion.app}</p>
    </>
  )
}

export default About
