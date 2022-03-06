import { createContext, useContext } from "react"

export const PlaneDataContext = createContext({
  rows: 10,
  cols: 10,
  width: 125,
  height: 125,
  angle: 0
})

export const usePlaneDataContext = () => useContext(PlaneDataContext)
