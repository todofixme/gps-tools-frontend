import axios from 'axios'
import { BackendVersion } from '../../@types/common'
import { useQuery } from '@tanstack/react-query'

const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

function fetchBackendVersion(): Promise<BackendVersion> {
  return backendApi.get('/version').then((response) => response.data)
}

export function useBackendVersion() {
  return useQuery({ queryKey: ['backendVersion'], queryFn: fetchBackendVersion })
}

export default backendApi
