import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import GamePlay from './GamePlay';
import Results from './Results';
import {
  addNewPlayer,
  getRollDiceResult,
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
  redraw,
} from '../actions/GameActions';
import { GAME_START, GAME_ON } from './../selectors/variables';

import _ from 'lodash';
import GamePanel from "./GamePanel";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceShowed: { number: '4' },
    };
  }


  componentDidMount() {
    const redraw = (e) => this.props.redraw(e.target.outerWidth, e.target.outerHeight);
    window.addEventListener(
      'resize',
      _.debounce((e) => redraw(e), 500)
    );
  }

  render() {
    const {
      status,
      players: { all },
    } = this.props.game;

    return (
      <div className={'main'}>
        { status === GAME_START ? (
          <Fragment>
            <div>مرحله آغازین بازی</div>
          </Fragment>
          ) : (
          status === GAME_ON ? (
          <Fragment>
            <GamePlay />

            <GamePanel />
          </Fragment>
        ) : (
          <Results players={all} startNewGame={this.props.restartGame} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(
  mapStateToProps,
  {
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
    redraw,
  }
)(Game);
