import React, { useEffect, useState } from 'react';
import { Image, Group, Rect } from 'react-konva';
import { Motion, spring } from 'react-motion';
import { getImage, getPlayerCoordinates } from './../../selectors/utils';
import avatars from './../../images/avatars/avatars';

const Player = props => {
  const {
    player: { id, pos, avatar, boxPosition },
    current: { id: currentPlayerId },
    grid: {
      box: { width },
    },
    grid,
  } = props;
  const { x, y } = getPlayerCoordinates(pos, grid, boxPosition);
  const isCurrent = id === currentPlayerId;

  let [playerSource, setPlayerSource] = useState();
  useEffect(() => {
    getImage(avatars[avatar - 1]).then(image => setPlayerSource(image));
  }, []);

  const minifiedWidth = width - 10;
  return (
    <Motion style={{ x: spring(x), y: spring(y), stiffness: 211, dumping: 33 }}>
      {({ x, y }) => (
        <Group>
          <Rect
            x={x - minifiedWidth / 2}
            y={y - minifiedWidth / 2}
            width={minifiedWidth}
            height={minifiedWidth}
            cornerRadius={10}
            scale={{ x: 0.92, y: 0.92 }}
            fill={isCurrent ? 'rgba(255,255,255,0.9)' : 'transparent'}
          />
          <Image
            x={x - minifiedWidth / 2}
            y={y - minifiedWidth / 2}
            width={minifiedWidth}
            height={minifiedWidth}
            image={playerSource}
          />
        </Group>
      )}
    </Motion>
  );
};

export default Player;
