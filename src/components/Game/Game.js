import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { GAME_START, GAME_ON } from '../../constants/variables';
import { redraw } from '../../redux/actions/GameActions';

import StartPage from '../Home';
import TopBar from './TopBar';
import GamePlay from './GamePlay';
import Results from './Results';
import debounce from 'lodash-es/debounce';

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
    window.addEventListener('resize', debounce(e => redrawFn(e), 500));
  }, [redraw]);

  return (
    <div className={'main'}>
      {status === GAME_START ? (
        <StartPage />
      ) : status === GAME_ON ? (
        <>
          <TopBar />
          <GamePlay />
        </>
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
