import React from 'react';
import { Layer, Line } from 'react-konva';
import { getPlayerCoordinates } from '../config/utils';
import { styles } from '../styles';

export default class CanvasLadder extends React.Component {
  render () {
    const { ladder: { startPos, endPos }, grid } = this.props;
    const { x: startX, y: startY } = getPlayerCoordinates(startPos, grid);
    const { x: endX, y: endY } = getPlayerCoordinates(endPos, grid);

    return (
      <Layer>
        <Line
          points={[startX, startY, endX, endY]}
          stroke={styles.gray}
          lineCap="round"
          strokeWidth={2}
          dash={[20, 5]}
          />
        <Line
          points={[startX - 6, startY, endX - 6, endY]}
          stroke={styles.gray}
          lineCap="round"
          strokeWidth={2}
          dash={[20, 5]}
          />
      </Layer>
    )
  }
}
