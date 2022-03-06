import React from "react"
// import { PlaneDataProvider } from "../PlaneDataProvider/PlaneDataProvider"

export const Plane = ({ transform, children }) => {
  // const [data, setData] = useState({})
  return (
    <g transform-origin="center" transform={transform}>
      {children}
    </g>
  )
}
