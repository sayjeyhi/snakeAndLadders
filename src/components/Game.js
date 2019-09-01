import React from 'react';
import { connect } from 'react-redux';
import { Stage } from 'react-konva';
import CanvasGrid from './Canvas.Grid';
import CanvasPlayer from './Canvas.Player';
import CanvasSnake from './Canvas.Snake';
import CanvasLadder from './Canvas.Ladder';
import Players from './Players';
import Results from './Results';
import {
  addNewPlayer, getRollDiceResult, movePlayer, changePlayer,
  changePlayerPositionInBox, recordDiceLog, logMessage,
  enableDice, setPlayerPersistence, endGame,
  addSnakeBite, addLadderHike, restartGame, redraw
} from '../actions/GameActions';
import { GAME_ON, MAX_PLAYERS } from './../selectors/variables';
import { delay } from './../selectors/utils';
import _ from 'lodash';

class Game extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      diceOutput: {__html: '&#x2684;'}
    }
  }

  handleResize (e) {
    this.props.redraw(e.target.outerWidth, e.target.outerHeight);
  }

  componentDidMount () {
    window.addEventListener('resize', _.debounce(this.handleResize.bind(this), 500));
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize);
  }

  render () {
    const {
      status,
      dice: { disabled: isDiceDisabled },
      grid: { width, height, layout }, grid,
      players: { all, current: { color: currentPlayerColor }, current }, players,
      snakes, ladders, messages
    } = this.props.game;

    return (
      <div className={'main'}>
        {
          status === GAME_ON
          ?
          <div>
            <div className={'gameBlock'}>
              <Stage
                width={width}
                height={height}>
                <CanvasGrid grid={grid} />
                { /* snakes */
                  snakes.map((s, index) => {
                    return (
                      <CanvasSnake
                        key={`canvasSnake_${index}`}
                        snake={s}
                        grid={grid}
                        />
                    )
                  })
                }
                { /* ladders */
                  ladders.map((l, index) => {
                    return (
                      <CanvasLadder
                        key={`canvasLadder_${index}`}
                        ladder={l}
                        grid={grid}
                        />
                    )
                  })
                }
                { /* players */
                  all.map((p, index) => {
                    return (
                      <CanvasPlayer
                        key={`canvasPlayer_${index}`}
                        player={p}
                        current={current}
                        grid={grid}
                        />
                    )
                  })
                }
              </Stage>
            </div>
            <div className={'dataBlock'}>
              <Players players={players} addNewPlayer={this._addNewPlayer.bind(this)}/>
              <section className="commentry-section commentry">
                {messages[0]}
              </section>
              <section className="dice-section">
                  <button disabled={isDiceDisabled}
                    onClick={this._rollDice.bind(this)}
                    style={{opacity: isDiceDisabled ? 0.5 : 1}}>
                    Roll Dice
                    <span className={'dice'} dangerouslySetInnerHTML={this.state.diceOutput} />
                  </button>
                <section id="cubeContainer">
                  <div id="cube" className="show-spining show-4">
                    <figure className="front">1</figure>
                    <figure className="back">2</figure>
                    <figure className="right">3</figure>
                    <figure className="left">4</figure>
                    <figure className="top">5</figure>
                    <figure className="bottom">6</figure>
                  </div>
                </section>
              </section>
              <section className="actions-section">
                <button onClick={() => {this.props.endGame()}} className="endCta">End</button>
                <button onClick={() => {this.props.restartGame()}} className="restartCta">Restart</button>
              </section>
              <section className="sction-rules rules">
                * Upto 4 Players can play at a time. <br />
              </section>
            </div>
          </div>
          :
          <Results players={all} startNewGame={this.props.restartGame}/>
        }
      </div>
    );
  }

  _rollDice () {
    const { players: { current: { id, pos }, persistence } } = this.props.game;
    const diceResult = getRollDiceResult();
    this.setState({
      diceOutput: {__html: `&#x268${diceResult - 1};`}
    })
    const newPos = pos + diceResult;

    this.props.recordDiceLog(diceResult);

    /**
     * GAME LOGIC
     **/
    if (newPos > 100) {
      this.props.logMessage(`Hang in there Player ${id}`);
      this.props.changePlayer();
    } else if (newPos == 100) {
      this.props.movePlayer(newPos);
      this.props.endGame();
    } else {
      this.props.movePlayer(newPos);
      this.props.logMessage(`Player ${id} moved from  block ${pos} to block ${newPos}. ${diceResult === 6 ? '**SIX**' : ''}`);

      this._checkSnakeBiteorLadderJump(newPos);
      this._resolveOccupancyOverload();

      if (diceResult === 6 && persistence < 3) {
        this.props.enableDice();
        this.props.setPlayerPersistence(persistence + 1);
      } else {
        this.props.changePlayer();
        this.props.setPlayerPersistence(1);
      }
    }
  }

  _checkSnakeBiteorLadderJump (playerPos) {
    const { snakes, ladders, players: { current: { id } } } = this.props.game;
    const snakeStartPosList = snakes.map((s) => s.startPos);
    const ladderStartPosList = ladders.map((l) => l.startPos);

    if (snakeStartPosList.indexOf(playerPos) !== -1) {
      /* busted */
      const snake = snakes.filter((s) => (s.startPos === playerPos))[0];
      this.props.movePlayer(snake.endPos);
      this.props.addSnakeBite();
      this.props.logMessage(`A snake ate Player ${id} at ${playerPos}, moved to block ${snake.endPos}`);
    }

    if (ladderStartPosList.indexOf(playerPos) !== -1) {
      /* got wings */
      const ladder = ladders.filter((l) => (l.startPos === playerPos))[0];
      this.props.movePlayer(ladder.endPos);
      this.props.addLadderHike();
      this.props.logMessage(`Player ${id} found Ladder at ${playerPos}, moved to block ${ladder.endPos}`);
    }

  }

  _resolveOccupancyOverload () {
    delay(() => {
      const { grid: { occupancy }, players: { all } } = this.props.game;
      const boxesWithMoreThanOneOccupants = Object.keys(occupancy).filter((box) => occupancy[box]>1);
      for (let box of boxesWithMoreThanOneOccupants) {
        const playersWithinBox = all.filter((player) => player.pos == box);
        let count = 0;
        for (let player of playersWithinBox) {
            this.props.changePlayerPositionInBox(player.id, count++);
        }
      }
    });
  }

  _addNewPlayer () {
    this.props.addNewPlayer();
    this._resolveOccupancyOverload();
  }
}

function mapStateToProps(state) {
  const { game } = state;
  return {
    game
  };
}

export default connect(mapStateToProps, {
  addNewPlayer,
  movePlayer,
  changePlayer,
  changePlayerPositionInBox,
  recordDiceLog,
  logMessage,
  enableDice,
  setPlayerPersistence,
  endGame,
  addSnakeBite,
  addLadderHike,
  restartGame,
  redraw
})(Game);
