import React from 'react';
import Players from './Players';
import Dice from './Dice';
import { connect } from 'react-redux';
import { rollDice, endGame, restartGame } from '../actions/GameActions';

const GamePanel = props => {
  const {
    dice: { disabled: isDiceDisabled },
    players,
    messages,
  } = props.state;

  return (
    <>
      <Dice rolling={isDiceDisabled} />
      <div className={'dataBlock'}>
        <section className="playersPart">
          <div className={'separatorTitle'}>
            <span className={'rightTitle'}>نفرات</span>
          </div>
          <Players players={players} />
        </section>
        <section className={'rollDicePart'}>
          <button
            className={'rollDiceBtn ' + (isDiceDisabled ? 'disabled' : '')}
            disabled={isDiceDisabled}
            onClick={
              !isDiceDisabled ? () => props.dispatch(rollDice()) : () => {}
            }
          >
            پرتاب تاس
          </button>
        </section>
        <section
          className="messagePart"
          dangerouslySetInnerHTML={{ __html: messages[0] }}
        />

        <section className="controlPart">
          <button onClick={() => props.dispatch(restartGame())} className="btn">
            ریستارت
          </button>
          <button onClick={() => props.dispatch(endGame())} className="btn">
            پایان
          </button>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePanel);
