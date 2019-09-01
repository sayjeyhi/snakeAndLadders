import React from 'react';
import { Line, Circle } from 'react-konva';
import { getPlayerCoordinates } from './../../selectors/utils';
import { RED } from './../../selectors/variables';

const Snake = props => {
  const {
    snake: { startPos, endPos },
    grid,
  } = props;
  const { x: startX, y: startY } = getPlayerCoordinates(startPos, grid);
  const { x: endX, y: endY } = getPlayerCoordinates(endPos, grid);

  return (
    <>
      <Line
        points={[startX, startY, endX, endY]}
        stroke={RED}
        lineCap="round"
        strokeWidth={4}
        dash={[1, 5]}
      />
      <Circle x={startX} y={startY} radius={5} fill={RED} />
    </>
  );
};

export default Snake;
