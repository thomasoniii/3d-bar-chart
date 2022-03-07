import React from "react"

import { Plane } from "./Plane"
import { useChartDataContext } from "../ChartDataProvider"
import { PlaneDataProvider } from "../PlaneDataProvider/PlaneDataProvider"

export const ZPlane = ({ offset = 0, children }) => {
  const {
    chartWidth,
    chartHeight,
    xBoxes,
    zBoxes,
    boxSize, // { xyh: 10, xzw: 10, ywzh: 10 }
    angle
  } = useChartDataContext()

  const width = xBoxes * boxSize.xzw
  const height = zBoxes * boxSize.ywzh

  const calculatedOffset = boxSize.xyh * offset

  return (
    <Plane
      transform={`
        translate(0,-${calculatedOffset})
        rotate(${angle * 2})
        translate(${chartWidth / 2},${chartHeight / 2})
      `}
    >
      <PlaneDataProvider
        value={{
          rows: zBoxes,
          cols: xBoxes,
          width,
          height,
          angle: -angle
        }}
      >
        {children}
      </PlaneDataProvider>
    </Plane>
  )
}
