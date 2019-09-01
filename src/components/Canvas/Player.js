import React from 'react';
import { Motion, spring } from 'react-motion';
import { Circle, Group, Text } from 'react-konva';
import { getPlayerCoordinates } from './../../selectors/utils';
import { WHITE } from './../../selectors/variables';

const Player = props => {
  const {
    player: { color, id, pos, boxPosition },
    current: { id: currentPlayerId },
    grid: {
      box: { width },
    },
    grid,
  } = props;
  const { x, y } = getPlayerCoordinates(pos, grid, boxPosition);
  const isCurrent = id === currentPlayerId;
  const isSmallScreen = width < 48;

  return (
    <>
      <Motion style={{ x: spring(x), y: spring(y) }}>
        {({ x, y }) => (
          <Group>
            <Circle
              x={x}
              y={y}
              radius={isSmallScreen ? 6 : 12}
              fill={isCurrent ? WHITE : color}
              stroke={color}
              strokeWidth={2}
            />
            <Text
              x={isSmallScreen ? x - 2 : x - 4}
              y={isSmallScreen ? y - 3 : y - 7}
              fill={isCurrent ? color : WHITE}
              text={id}
              fontSize={isSmallScreen ? 6 : 15}
              fontFamily={'arial'}
            />
          </Group>
        )}
      </Motion>
    </>
  );
};

export default Player;
