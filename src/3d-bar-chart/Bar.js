/* eslint-disable */

import React from "react"
import { Animator, AnimationConsumer } from "react-interpolation-animation"

import { XPlane, YPlane, ZPlane } from "./Planes"
import { useChartDataContext } from "./ChartDataProvider"
import Box from "./Box"

const Bar = ({ box }) => {
  const { yBoxes } = useChartDataContext()
  const d = 200

  return (
    <Animator values={["measure"]} initial={{ measure: 0 }} duration={d}>
      <AnimationConsumer
        measure={box.height}
        render={({ measure: m }) => {
          return (
            <>
              {m && (
                <XPlane offset={box.z + 1}>
                  <Box
                    x={box.x}
                    y={box.y}
                    measure={m}
                    fill={box.fillX || box.fill}
                    flipVertical
                  />
                </XPlane>
              )}

              {m && (
                <YPlane offset={box.x + 1}>
                  <Box
                    x={box.z}
                    y={box.y}
                    measure={m}
                    fill={box.fill || box.fillY}
                    flipVertical
                  />
                </YPlane>
              )}

              <ZPlane offset={m * yBoxes}>
                <Box x={box.x} y={box.z} fill={box.fillZ || box.fill} />
              </ZPlane>
            </>
          )
        }}
      />
    </Animator>
  )
}

export default Bar
