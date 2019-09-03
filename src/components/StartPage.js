import React from 'react';
import logo from './../images/logo.png';

const StartPage = () => {
  return (
    <div className="wholeHolder">
      <div className="flexCenter logo">
        <img src={logo} alt="مارو پله" />
      </div>

      <div className="flexCenter level">
        <div class="chooseLine">
          <span data-title="ساده" class="step step_one active">
            🤗
          </span>
          <span data-title="متوسط" class="step step_two">
            😎
          </span>
          <span data-title="حرفه ای" class="step step_three">
            😈
          </span>
        </div>
      </div>
      <div className="flexCenter colorMode"></div>

      <div className={'flexCenter'}>
        <button
          className={'btn big'}
          onClick={() => {
            this.props.startNewGame();
          }}
        >
          <span className={'icon'}>🚀</span>
          شروع بازی
        </button>
        <button
          className={'btn big disabled'}
          onClick={() => {
            this.props.startNewGame();
          }}
        >
          <span className={'icon'}></span>
          بازی آنلاین(به زودی)
        </button>
      </div>
    </div>
  );
};

export default StartPage;
