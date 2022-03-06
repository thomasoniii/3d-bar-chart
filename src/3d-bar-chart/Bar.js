/* eslint-disable */

import React from "react"

import { XPlane, YPlane, ZPlane } from "./Planes"
import { useChartDataContext } from "./ChartDataProvider"
import Box from "./Box"

const Bar = ({ box }) => {
  const { zBoxes } = useChartDataContext()
  return (
    <>
      <XPlane offset={box.z + 1}>
        <Box
          x={box.x}
          y={box.y}
          measure={box.height}
          fill={box.fillX || box.fill}
          flipVertical
        />
      </XPlane>
      <YPlane offset={box.x + 1}>
        <Box
          x={box.z}
          y={box.y}
          measure={box.height}
          fill={box.fill || box.fillY}
          flipVertical
        />
      </YPlane>
      <ZPlane offset={box.height * zBoxes}>
        <Box x={box.x} y={box.z} fill={box.fillZ || box.fill} />
      </ZPlane>
    </>
  )
}

export default Bar
