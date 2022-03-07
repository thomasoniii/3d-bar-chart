/* eslint-disable */

import React from "react"
import { Animator, AnimationConsumer } from "react-interpolation-animation"

import { XPlane, YPlane, ZPlane } from "./Planes"
import { useChartDataContext } from "./ChartDataProvider"
import Box from "./Box"

const Bar = ({ box }) => {
  const { yBoxes } = useChartDataContext()
  const d = 1000
  const measure = box.height
  const zOffset = box.height * yBoxes
  return (
    <>
      <XPlane offset={box.z + 1}>
        <Animator values={["measure"]} duration={d}>
          <Box
            x={box.x}
            y={box.y}
            measure={box.height}
            fill={box.fillX || box.fill}
            flipVertical
          />
        </Animator>
      </XPlane>
      <YPlane offset={box.x + 1}>
        <Animator values={["measure"]} duration={d}>
          <Box
            x={box.z}
            y={box.y}
            measure={box.height}
            fill={box.fill || box.fillY}
            flipVertical
          />
        </Animator>
      </YPlane>
      <Animator values={["offset"]} duration={d}>
        <ZPlane offset={zOffset}>
          <Animator values={["measure"]} duration={d}>
            <Box x={box.x} y={box.z} fill={box.fillZ || box.fill} />
          </Animator>
        </ZPlane>
      </Animator>
    </>
  )
}

export default Bar
