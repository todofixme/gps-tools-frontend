import React from 'react'
import AppContext from './AppContext'

export type AppProviderType = {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderType> = ({ children }) => {
  const [preserveWaypoints, setPreserveWaypoints] = React.useState(false)
  const [reloadModalOpen, setReloadModalOpen] = React.useState(false)

  return (
    <AppContext.Provider
      value={{ preserveWaypoints, setPreserveWaypoints, reloadModalOpen, setReloadModalOpen }}
    >
      {children}
    </AppContext.Provider>
  )
}
