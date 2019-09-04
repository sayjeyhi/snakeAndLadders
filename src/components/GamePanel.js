import React from 'react';
import Players from './Players';
import Dice from './Dice';
import { connect } from 'react-redux';
import {
  addLadderHike,
  addNewPlayer,
  addSnakeBite,
  changePlayer,
  enableDice,
  endGame,
  getRollDiceResult,
  logMessage,
  restartGame,
  movePlayer,
  recordDiceLog,
  setPlayerPersistence,
} from '../actions/GameActions';
import {
  getRandomExcellentEmoji,
  getRandomEmoji,
  getRandomSadEmoji,
} from '../selectors/utility';

const GamePanel = props => {
  const {
    dice: { disabled: isDiceDisabled },
    players,
    messages,
  } = props.game;

  const _rollDice = () => {
    const {
      snakes,
      ladders,
      players: {
        current: { pos, name },
        persistence,
      },
    } = props.game;

    const diceResult = getRollDiceResult();
    props.recordDiceLog(diceResult);

    const newPos = pos + diceResult;

    /**
     * GAME LOGIC
     **/
    if (newPos > 100) {
      props.logMessage(` ${name} منتظر عدد مناسب ! 😨 `);
      props.changePlayer();
    } else if (newPos === 100) {
      props.movePlayer(newPos);
      props.endGame();
    } else {
      props.movePlayer(newPos);
      let emoji = getRandomEmoji(diceResult);

      props.logMessage(
        ` ${name} ${diceResult} آورد ${emoji} ${diceResult === 6 ? '***' : ''}`
      );

      // Check snake and ladders hit
      {
        const snakeStartPosList = snakes.map(s => s.startPos);
        const ladderStartPosList = ladders.map(l => l.startPos);

        if (snakeStartPosList.indexOf(newPos) !== -1) {
          /* busted */
          const snake = snakes.filter(s => s.startPos === newPos)[0];
          props.movePlayer(snake.endPos);
          props.addSnakeBite();
          props.logMessage(
            ` ${name} ${diceResult} آورد و با مار برخورد کرد ${getRandomSadEmoji()}`
          );
        }

        if (ladderStartPosList.indexOf(newPos) !== -1) {
          /* got wings */
          const ladder = ladders.filter(l => l.startPos === newPos)[0];
          props.movePlayer(ladder.endPos);
          props.addLadderHike();
          props.logMessage(
            ` ${name} ${diceResult} آورد و از نردبان بالا رفت  ${getRandomExcellentEmoji()}`
          );
        }
      }

      if (diceResult === 6 && persistence < 3) {
        setTimeout(props.enableDice, 700);
        props.setPlayerPersistence(persistence + 1);
      } else {
        props.changePlayer();
        props.setPlayerPersistence(1);
      }
    }
  };

  return (
    <>
      <Dice rolling={isDiceDisabled} />
      <div className={'dataBlock'}>
        <section className="playersPart">
          <div className={'separatorTitle'}>
            <span className={'rightTitle'}>نفرات</span>
          </div>
          <Players players={players} addNewPlayer={props.addNewPlayer} />
        </section>
        <section className={'rollDicePart'}>
          <button
            className={'rollDiceBtn ' + (isDiceDisabled ? 'disabled' : '')}
            disabled={isDiceDisabled}
            onClick={!isDiceDisabled ? _rollDice.bind(this) : () => {}}
          >
            پرتاب تاس
          </button>
        </section>
        <section
          className="messagePart"
          dangerouslySetInnerHTML={{ __html: messages[0] }}
        />

        <section className="controlPart">
          <button onClick={props.restartGame} className="btn">
            ریستارت
          </button>
          <button onClick={props.endGame} className="btn">
            پایان
          </button>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(
  mapStateToProps,
  {
    addNewPlayer,
    movePlayer,
    changePlayer,
    recordDiceLog,
    logMessage,
    enableDice,
    setPlayerPersistence,
    restartGame,
    endGame,
    addSnakeBite,
    addLadderHike,
  }
)(GamePanel);
