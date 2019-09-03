import React, { useEffect, useState } from "react";
import Players from "./Players";
import { connect } from "react-redux";
import {
  addLadderHike,
  addNewPlayer, addSnakeBite,
  changePlayer,
  changePlayerPositionInBox, enableDice, endGame,
  getRollDiceResult, logMessage,
  restartGame,
  movePlayer, recordDiceLog, setPlayerPersistence
} from "../actions/GameActions";
import { delay, getRandomExcellentEmoji, getRandomEmoji, getRandomSadEmoji } from "../selectors/utils";

const GamePanel = (props) => {
  const {
    dice: { disabled: isDiceDisabled },
    players: { all },
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
    const newPos = pos + diceResult;

    props.recordDiceLog(diceResult);

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

      _resolveOccupancyOverload();

      if (diceResult === 6 && persistence < 3) {
        props.enableDice();
        props.setPlayerPersistence(persistence + 1);
      } else {
        props.changePlayer();
        props.setPlayerPersistence(1);
      }
    }
  };


  const _resolveOccupancyOverload = () => {
    delay(() => {
      const {
        grid: { occupancy },
        players: { all },
      } = props.game;
      const boxesWithMoreThanOneOccupants = Object.keys(occupancy).filter(
        box => occupancy[box] > 1
      );
      for (let box of boxesWithMoreThanOneOccupants) {
        const playersWithinBox = all.filter(player => player.pos === box);
        let count = 0;
        for (let player of playersWithinBox) {
          props.changePlayerPositionInBox(player.id, count++);
        }
      }
    });
  };

  const _addNewPlayer = () => {
    props.addNewPlayer();
    _resolveOccupancyOverload();
  };


  return (
    <div className={'dataBlock'}>
      <section className="playersPart">
        <div className={'separatorTitle'}>
          <span className={'rightTitle'}>نفرات</span>
        </div>
        <Players
          players={players}
          addNewPlayer={_addNewPlayer.bind(this)}
        />
      </section>
      <section className={'rollDicePart'}>
        <button
          className={'rollDiceBtn ' + (isDiceDisabled ? 'disabled' : '')}
          disabled={isDiceDisabled}
          onClick={!isDiceDisabled ? _rollDice.bind(this) : () => {} }
        >
          پرتاب تاس
        </button>
      </section>
      <section className="messagePart">
        {messages[0]}
      </section>

      <section className="controlPart">
        <button onClick={props.restartGame} className="btn">
          ریستارت
        </button>
        <button onClick={props.endGame} className="btn">
          پایان
        </button>
      </section>
    </div>
  );
};


const mapStateToProps = (state) => ({
  game: state.game
});

export default connect(mapStateToProps,   {
  addNewPlayer,
  movePlayer,
  changePlayer,
  changePlayerPositionInBox,
  recordDiceLog,
  logMessage,
  enableDice,
  setPlayerPersistence,
  restartGame,
  endGame,
  addSnakeBite,
  addLadderHike
})(GamePanel);
