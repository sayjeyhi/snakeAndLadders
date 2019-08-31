import React from 'react';
import { Layer, Rect, Group, Text } from 'react-konva';
import { styles } from '../styles';
import { GRID_WIDTH, GRID_HEIGHT } from '../config/variables';

export default class CanvasGrid extends React.Component {

  render () {
    const { layout, box: { width: boxWidth, height: boxHeight }, width, height } = this.props.grid;

    return (
      <Layer>
        {
          Object.keys(layout).map((box) => {
            const isEven = box % 2 === 0;
            return (
              <Group key = {`box_${box}`}>
                <Rect x={0} y={0} width={width} height={height} stroke={styles.darkBlue} strokeWidth={4} />
                <Rect
                  x = {layout[box].x - (boxWidth / 2)} y = {layout[box].y - (boxHeight / 2)}
                  width = {boxWidth} height = {boxHeight}
                  fill = {isEven ? styles.darkBlue : styles.lightBlue }
                />
                <Text
                  x = {layout[box].x - (boxWidth / 2)} y = {layout[box].y - (boxHeight / 2)}
                  fill = {isEven ? styles.lightBlue : styles.darkBlue }
                  text = {box} padding = {4}
                  fontSize = {16} fontFamily = {'arial'} />
              </Group>
            )
          })
        }
      </Layer>
    );
  }
}
