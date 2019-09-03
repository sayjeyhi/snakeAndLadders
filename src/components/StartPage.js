import React from 'react';
import { restartGame } from "../actions/GameActions";
import logo from './../images/logo.png';
import { connect } from "react-redux";

const StartPage = (props) => {
  return (
    <div className="wholeHolder">
      <div className="flexCenter logo">
        <img src={logo} alt="مارو پله" />
      </div>

      <div className="flexCenter level">
        <div className="chooseLine">
          <span data-title="ساده" className="step step_one active">
            🤗
          </span>
          <span data-title="متوسط" className="step step_two">
            😎
          </span>
          <span data-title="حرفه ای" className="step step_three">
            😈
          </span>
        </div>
      </div>
      <div className="flexCenter colorMode"></div>

      <div className={'flexCenter'}>
        <button
          className={'btn big orange'}
          onClick={() => {
            props.restartGame();
          }}
        >
          <span className={'icon'}>🚀</span>
          شروع بازی
        </button>
        <button
          className={'btn big black'}
          onClick={() => {
            alert('Coming Soon')
          }}
        >
          <span className={'icon'}>🏆</span>
          بازی آنلاین(به زودی)
        </button>
      </div>
    </div>
  );
};



export default connect(null , { restartGame })(StartPage);
