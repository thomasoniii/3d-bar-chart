import React from "react"
import { PlaneDataContext } from "./PlaneDataContext"

export const PlaneDataProvider = ({ children, value }) => {
  return (
    <PlaneDataContext.Provider value={value}>
      {children}
    </PlaneDataContext.Provider>
  )
}
