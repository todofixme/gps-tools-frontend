import React, { createContext } from 'react'

type AppContextType = {
  preserveWaypoints: boolean
  setPreserveWaypoints: React.Dispatch<React.SetStateAction<boolean>>
  optimizeWaypoints: boolean
  setOptimizeWaypoints: React.Dispatch<React.SetStateAction<boolean>>
  reloadModalOpen: boolean
  setReloadModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  downloadModalOpen: boolean
  setDownloadModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<AppContextType | null>(null)

export default AppContext
