import React from "react"
import { ChartDataContext } from "./ChartDataContext"

export const ChartDataProvider = ({ children, data }) => {
  return (
    <ChartDataContext.Provider value={data}>
      {children}
    </ChartDataContext.Provider>
  )
}
