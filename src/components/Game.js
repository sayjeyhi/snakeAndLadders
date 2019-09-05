import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { GAME_START, GAME_ON } from './../constants/variables';
import { redraw } from '../actions/GameActions';

import StartPage from './StartPage';
import GamePanel from './GamePanel';
import GamePlay from './GamePlay';
import Results from './Results';
import _ from 'lodash';

const Game = props => {
  const {
    redraw,
    state: {
      game: { status },
      players: { all },
    },
  } = props;

  useEffect(() => {
    // redraw canvas when resize the page
    const redrawFn = e => redraw(e.target.outerWidth, e.target.outerHeight);
    window.addEventListener('resize', _.debounce(e => redrawFn(e), 500));

    /* eslint-disable-next-line */
  }, []);

  return (
    <div className={'main'}>
      {status === GAME_START ? (
        <Fragment>
          <StartPage />
        </Fragment>
      ) : status === GAME_ON ? (
        <Fragment>
          <GamePanel />
          <GamePlay />
        </Fragment>
      ) : (
        <Results players={all} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  state,
});

export default connect(
  mapStateToProps,
  { redraw }
)(Game);
