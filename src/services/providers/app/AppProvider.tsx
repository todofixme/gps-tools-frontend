import React, { useState } from 'react'
import AppContext from './AppContext'

export type AppProviderType = {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderType> = ({ children }) => {
  const [preserveWaypoints, setPreserveWaypoints] = React.useState(false)
  const [optimizeWaypoints, setOptimizeWaypoints] = React.useState(true)
  const [reloadModalOpen, setReloadModalOpen] = React.useState(false)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  return (
    <AppContext.Provider
      value={{
        preserveWaypoints,
        setPreserveWaypoints,
        optimizeWaypoints,
        setOptimizeWaypoints,
        reloadModalOpen,
        setReloadModalOpen,
        downloadModalOpen,
        setDownloadModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
