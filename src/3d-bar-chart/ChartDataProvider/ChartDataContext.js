import { createContext, useContext } from "react"

export const ChartDataContext = createContext({})

export const useChartDataContext = () => useContext(ChartDataContext)
