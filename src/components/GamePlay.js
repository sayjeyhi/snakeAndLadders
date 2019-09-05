import React from 'react';
import { Stage, Layer } from 'react-konva';

import Grid from './Canvas/Grid';
import Ladder from './Canvas/Ladder';
import Player from './Canvas/Player';
import Snake from './Canvas/Snake';
import { connect } from 'react-redux';

const GamePlay = props => {
  const {
    grid,
    game: { snakes, ladders },
    players: { all, current },
  } = props.state;

  return (
    <div className={'gameBlock'}>
      <Stage width={grid.width} height={grid.height}>
        <Layer>
          {/* Main game board */}
          <Grid grid={grid} />

          {// Make snakes
          snakes.map((snake, index) => {
            return (
              <Snake key={`canvasSnake_${index}`} snake={snake} grid={grid} />
            );
          })}
          {// Make ladders
          ladders.map((ladder, index) => {
            return (
              <Ladder key={`ladder_${index}`} ladder={ladder} grid={grid} />
            );
          })}
          {// Make players
          all.map((p, index) => {
            return (
              <Player
                key={`player_${index}`}
                player={p}
                current={current}
                grid={grid}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(GamePlay);
