import { createContext, useContext } from "react"

export const PlaneDataContext = createContext({})

export const usePlaneDataContext = () => useContext(PlaneDataContext)
