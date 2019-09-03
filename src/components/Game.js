import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from 'react-redux';
import { GAME_START, GAME_ON } from './../selectors/variables';
import { redraw, restartGame } from "../actions/GameActions";

import GamePanel from "./GamePanel";
import GamePlay from './GamePlay';
import Results from './Results';
import _ from 'lodash';


const Game = (props) => {

  const { redraw, restartGame, game: { status, players: { all }} } = props;

  useEffect(() => {

    // redraw canvas when resize the page
    const redrawFn = (e) => redraw(e.target.outerWidth, e.target.outerHeight);
    window.addEventListener(
      'resize',
      _.debounce((e) => redrawFn(e), 500)
    );

  }, []);


  return (
    <div className={'main'} >
      { status === GAME_START ? (
        <Fragment>
          <div>مرحله آغازین بازی</div>
        </Fragment>
        ) : (
        status === GAME_ON ? (
        <Fragment>
          <GamePanel ro />
          <GamePlay />
        </Fragment>
      ) : (
        <Results players={all} startNewGame={restartGame} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps,{redraw, restartGame})(Game);
