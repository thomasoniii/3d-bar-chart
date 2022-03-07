import React from "react"

import { ZPlane } from "./Planes"
import { RightLabel, LeftLabel } from "./Label"
import { useChartDataContext } from "./ChartDataProvider"

const Labels = ({
  labels,
  type = "left",
  onMouseOver = () => {},
  onMouseOut = () => {},
  onClick = () => {}
}) => {
  const { angle } = useChartDataContext()

  const typeMultiplier = type === "left" ? -1 : 1
  const Label = type === "left" ? LeftLabel : RightLabel
  return (
    <ZPlane>
      <g transform={`rotate(${typeMultiplier * angle})`}>
        {labels.map((label, i) => (
          <Label
            label={label}
            index={i}
            key={i}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
          />
        ))}
      </g>
    </ZPlane>
  )
}

export default Labels
