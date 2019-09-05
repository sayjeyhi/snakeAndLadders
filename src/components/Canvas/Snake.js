import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import {
  getImage,
  getPlayerCoordinates,
  getPointsInfo,
} from './../../constants/utilities';

import snakeLeftSide from './../../images/snakes/leftSide.png';
import snakeLong from './../../images/snakes/long.png';
import snakeTooLong from './../../images/snakes/solong.png';
import snakeMedium from './../../images/snakes/medium.png';

const Snake = props => {
  const {
    snake: { startPos, endPos },
    grid,
  } = props;

  // make position
  const { x: startX, y: startY } = getPlayerCoordinates(startPos, grid);
  const { x: endX, y: endY } = getPlayerCoordinates(endPos, grid);
  const { distance, angel } = getPointsInfo(startX, startY, endX, endY);

  let [snakeSource, setSnakeSource] = useState({
    width: 30,
  });

  useEffect(() => {
    let snakeFile;
    let width = 30;
    if (distance > 210) {
      snakeFile = snakeTooLong;
      width = 40;
    } else if (distance > 190 && distance < 210) {
      snakeFile = snakeLong;
    } else if (distance <= 190 && distance > 150) {
      snakeFile = snakeLeftSide;
      width = 50;
    } else if (distance <= 150 && distance > 120) {
      snakeFile = snakeLeftSide;
    } else {
      width = 120;
      snakeFile = snakeMedium;
    }

    // load ladder source
    getImage(snakeFile).then(image =>
      setSnakeSource({
        width,
        image,
      })
    );

    /* eslint-disable-next-line */
  }, []);

  return (
    <Image
      x={startX}
      y={startY}
      width={snakeSource.width}
      height={distance}
      rotation={angel}
      image={snakeSource.image}
    />
  );
};

export default Snake;
