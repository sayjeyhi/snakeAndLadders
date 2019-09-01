import React from "react"
import { Line } from "react-konva"
import { getPlayerCoordinates } from "./../../selectors/utils"
import { GRAY } from "./../../selectors/variables"

const Ladder = props => {
  const {
    ladder: { startPos, endPos },
    grid,
  } = props
  const { x: startX, y: startY } = getPlayerCoordinates(startPos, grid)
  const { x: endX, y: endY } = getPlayerCoordinates(endPos, grid)

  return (
    <>
      <Line
        points={[startX, startY, endX, endY]}
        stroke={GRAY}
        lineCap="round"
        strokeWidth={2}
        dash={[20, 5]}
      />
      <Line
        points={[startX - 6, startY, endX - 6, endY]}
        stroke={GRAY}
        lineCap="round"
        strokeWidth={2}
        dash={[20, 5]}
      />
    </>
  )
}

export default Ladder
