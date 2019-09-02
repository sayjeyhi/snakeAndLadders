import React, { Fragment, useState } from "react";
import Players from "./Players";
import { connect } from "react-redux";
import {
  addLadderHike,
  addNewPlayer, addSnakeBite,
  changePlayer,
  changePlayerPositionInBox, enableDice, endGame,
  getRollDiceResult, logMessage,
  movePlayer, recordDiceLog, redraw, restartGame, setPlayerPersistence
} from "../actions/GameActions";
import { delay, getRandomExcellentEmoji, getRandomRegularEmoji, getRandomSadEmoji } from "../selectors/utils";

const GamePanel = (props) => {
  const {
    dice: { disabled: isDiceDisabled },
    players: { all },
    players,
    messages,
  } = props.game;

  let [ diceNumber, setDiceNumber ] = useState(4);
  const _rollDice = () => {
    const {
      players: {
        current: { pos, name },
        persistence,
      },
    } = props.game;
    const diceResult = getRollDiceResult();
    setDiceNumber({
      diceNumber: diceResult
    });
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
      let emoji = getRandomRegularEmoji();
      switch (diceResult) {
        case 1:
        case 2:
          emoji = getRandomSadEmoji();
          break;
        case 3:
        case 4:
          emoji = getRandomRegularEmoji();
          break;
        case 5:
        case 6:
          emoji = getRandomExcellentEmoji();
          break;
        default:
          emoji = getRandomSadEmoji();
      }
      props.logMessage(
        ` ${name} ${diceResult} آورد ${emoji} ${diceResult === 6 ? '***' : ''}`
      );

      _checkSnakeBiteorLadderJump(newPos);
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

  const _checkSnakeBiteorLadderJump = (playerPos) => {
    const {
      snakes,
      ladders,
      players: {
        current: { name },
      },
    } = props.game;
    const snakeStartPosList = snakes.map(s => s.startPos);
    const ladderStartPosList = ladders.map(l => l.startPos);

    if (snakeStartPosList.indexOf(playerPos) !== -1) {
      /* busted */
      const snake = snakes.filter(s => s.startPos === playerPos)[0];
      props.movePlayer(snake.endPos);
      props.addSnakeBite();
      props.logMessage(
        ` ${name} با مار برخورد کرد ${getRandomSadEmoji()}`
      );
    }

    if (ladderStartPosList.indexOf(playerPos) !== -1) {
      /* got wings */
      const ladder = ladders.filter(l => l.startPos === playerPos)[0];
      props.movePlayer(ladder.endPos);
      props.addLadderHike();
      props.logMessage(
        ` ${name} از نردبان بالا رفت  ${getRandomExcellentEmoji()}`
      );
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
          onClick={_rollDice.bind(this)}
        >
          پرتاب تاس
        </button>
      </section>
      <section className="messagePart">
        {messages[0]}
      </section>
      <section className="dicePart">
        <button
          onClick={() => {
            props.endGame();
          }}
          className="btn"
        >
          پایان
        </button>
        <button
          onClick={() => {
            props.restartGame();
          }}
          className="btn"
        >
          ریستارت
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
  endGame,
  addSnakeBite,
  addLadderHike,
  restartGame,
  redraw,
})(GamePanel);
