import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import ladderSvgSmall from './../../images/ladders/small.png';
import ladderSvgMedium from './../../images/ladders/medium.png';
import ladderSvgBig from './../../images/ladders/big.png';
import {
  getPlayerCoordinates,
  getImage,
  getPointsInfo,
} from './../../constants/utilities';

const Ladder = props => {
  const {
    ladder: { startPos, endPos },
    grid,
  } = props;

  // make position
  const { x: startX, y: startY } = getPlayerCoordinates(startPos, grid);
  const { x: endX, y: endY } = getPlayerCoordinates(endPos, grid);
  const { distance, angel, size } = getPointsInfo(startX, startY, endX, endY);

  // todo : make this custom hook for Player,Snake,Ladder
  let [ladderSource, setLadderSource] = useState();

  useEffect(() => {
    let ladderFile;
    switch (size) {
      case 'big':
        ladderFile = ladderSvgBig;
        break;
      case 'medium':
        ladderFile = ladderSvgMedium;
        break;
      default:
        ladderFile = ladderSvgSmall;
    }

    // load ladder source
    getImage(ladderFile).then(image => setLadderSource(image));

    /* eslint-disable-next-line */
  }, []);

  return (
    <Image
      x={startX + 9}
      y={startY + 5}
      width={30}
      height={distance}
      rotation={angel}
      image={ladderSource}
    />
  );
};

export default Ladder;
