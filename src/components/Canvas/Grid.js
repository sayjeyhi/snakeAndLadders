import React, { Fragment } from 'react';
import { Rect, Group, Text } from 'react-konva';
import { GRID_LIGHT, GRID_DARK } from './../../constants/variables';

const Grid = props => {
  const {
    layout,
    box: { width: boxWidth, height: boxHeight },
    width,
    height,
  } = props.grid;

  return (
    <Fragment>
      {Object.keys(layout).map(box => {
        const isEven = box % 2 === 0;
        return (
          <Group key={`box_${box}`}>
            <Rect x={0} y={0} width={width} height={height} strokeWidth={4} />
            <Rect
              x={layout[box].x - boxWidth / 2}
              y={layout[box].y - boxHeight / 2}
              width={boxWidth}
              height={boxHeight}
              cornerRadius={10}
              fill={isEven ? GRID_LIGHT : GRID_DARK}
              scale={{ x: 0.92, y: 0.92 }}
              shadowEnabled={true}
              shadowOffset={{ x: 0, y: -5 }}
              shadowOpacity={1}
              shadowBlur={6}
              shadowColor={'rgba(0,0,0,0.2)'}
            />
            <Text
              x={layout[box].x - boxWidth / 2}
              y={layout[box].y - boxHeight / 2}
              fill={'rgba(0,0,0,0.6)'}
              text={box}
              padding={4}
              fontSize={16}
              fontStyle={'bold'}
              fontFamily={'SDF'}
            />
          </Group>
        );
      })}
    </Fragment>
  );
};

export default Grid;
