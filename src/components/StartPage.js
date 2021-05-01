import React from 'react';
import { connect } from 'react-redux';
import { restartGame } from '../redux/actions/GameActions';
import logo from '../assets/images/logo.png';

const StartPage = props => {
  return (
    <div className="wholeHolder">
      <div className="flexCenter logo">
        <img src={logo} alt="مارو پله" />
      </div>

      <div className="flexCenter level">
        <div className="chooseLine">
          <span
            data-title="ساده"
            role="img"
            aria-label="easy"
            className="step step_one active"
          >
            🤗
          </span>
          <span
            data-title="متوسط"
            role="img"
            aria-label="medium"
            className="step step_two"
          >
            😎
          </span>
          <span
            data-title="حرفه ای"
            role="img"
            aria-label="perfect"
            className="step step_three"
          >
            😈
          </span>
        </div>
      </div>
      <div className="flexCenter colorMode"></div>

      <div className={'flexCenter'}>
        <button
          className={'btn big red'}
          onClick={() => {
            props.restartGame();
          }}
        >
          <span className={'icon'} role="img" aria-label="easy">
            🚀
          </span>
          شروع بازی
        </button>
        <button
          className={'btn big black'}
          onClick={() => {
            alert('Coming Soon');
          }}
        >
          <span className={'icon'} role="img" aria-label="easy">
            🏆
          </span>
          بازی آنلاین(به زودی)
        </button>
      </div>
    </div>
  );
};

export default connect(
  null,
  { restartGame }
)(StartPage);
