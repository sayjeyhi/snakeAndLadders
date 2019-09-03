import React, { useEffect, useState } from 'react';
import { Line, Image } from 'react-konva';
import { getPlayerCoordinates, getImage, getPointsInfo } from './../../selectors/utils';
import { GRAY } from './../../selectors/variables';
import ladderSvg from './../../images/svg/ladder.svg';

const Ladder = props => {
  const {
    ladder: { startPos, endPos },
    grid,
  } = props;
  const { x: startX, y: startY } = getPlayerCoordinates(startPos, grid);
  const { x: endX, y: endY } = getPlayerCoordinates(endPos, grid);

  let [imageSource, setImageSource] = useState();
  useEffect(() => {
    getImage(ladderSvg)
      .then((image) => setImageSource(image))
  } , []);


  const { dx, dy, angel } = getPointsInfo(startX, startY, endX, endY);

  return (
    <>
      <Image
        x={startX}
        y={startY}
        width={20}
        height={dy}
        rotation={angel}
        image={ imageSource }
      />
      

      {/* <Line
        points={[startX, startY, endX, endY]}
        stroke={GRAY}
        lineCap="round"
        strokeWidth={2}
        dash={[20, 5]}
      /> */}
      <Line
        points={[startX - 6, startY, endX - 6, endY]}
        stroke={GRAY}
        lineCap="round"
        strokeWidth={2}
        dash={[20, 5]}
      />
    </>
  );
};

export default Ladder;
