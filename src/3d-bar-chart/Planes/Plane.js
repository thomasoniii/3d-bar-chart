import React from "react"

export const Plane = ({ transform, children }) => {
  return (
    <g transform-origin="center" transform={transform} className="plane">
      {children}
    </g>
  )
}
