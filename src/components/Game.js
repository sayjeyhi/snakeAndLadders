import React from "react"
import { connect } from "react-redux"
import GamePlay from "./GamePlay"
import Players from "./Players"
import Results from "./Results"
import {
  addNewPlayer,
  getRollDiceResult,
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
} from "../actions/GameActions"
import { GAME_ON, MAX_PLAYERS } from "./../selectors/variables"
import { delay } from "./../selectors/utils"
import _ from "lodash"

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      diceOutput: { __html: "&#x2684;" },
    }
  }

  handleResize(e) {
    this.props.redraw(e.target.outerWidth, e.target.outerHeight)
  }

  componentDidMount() {
    window.addEventListener(
      "resize",
      _.debounce(this.handleResize.bind(this), 500)
    )
  }

  // componentWillUnmount () {
  //   window.removeEventListener('resize', this.handleResize);
  // }

  render() {
    const {
      status,
      dice: { disabled: isDiceDisabled },
      players: {
        all,
        current: { color: currentPlayerColor },
      },
      players,
      messages,
    } = this.props.game

    return (
      <div className={"main"}>
        {status === GAME_ON ? (
          <>
            <GamePlay />

            <div className={"dataBlock"}>
              <Players
                players={players}
                addNewPlayer={this._addNewPlayer.bind(this)}
              />
              <section className="commentry-section commentry">
                {messages[0]}
              </section>
              <section className="dice-section">
                <button
                  disabled={isDiceDisabled}
                  onClick={this._rollDice.bind(this)}
                  style={{
                    opacity: isDiceDisabled ? 0.5 : 1,
                  }}
                >
                  Roll Dice
                  <span
                    className={"dice"}
                    dangerouslySetInnerHTML={this.state.diceOutput}
                  />
                </button>
              </section>
              <section className="actions-section">
                <button
                  onClick={() => {
                    this.props.endGame()
                  }}
                  className="endCta"
                >
                  End
                </button>
                <button
                  onClick={() => {
                    this.props.restartGame()
                  }}
                  className="restartCta"
                >
                  Restart
                </button>
              </section>
              <section className="sction-rules rules">
                * Upto 4 Players can play at a time. <br />
              </section>
            </div>
          </>
        ) : (
          <Results players={all} startNewGame={this.props.restartGame} />
        )}
      </div>
    )
  }

  _rollDice() {
    const {
      players: {
        current: { id, pos },
        persistence,
      },
    } = this.props.game
    const diceResult = getRollDiceResult()
    this.setState({
      diceOutput: { __html: `&#x268${diceResult - 1};` },
    })
    const newPos = pos + diceResult

    this.props.recordDiceLog(diceResult)

    /**
     * GAME LOGIC
     **/
    if (newPos > 100) {
      this.props.logMessage(`Hang in there Player ${id}`)
      this.props.changePlayer()
    } else if (newPos == 100) {
      this.props.movePlayer(newPos)
      this.props.endGame()
    } else {
      this.props.movePlayer(newPos)
      this.props.logMessage(
        `Player ${id} moved from  block ${pos} to block ${newPos}. ${
          diceResult === 6 ? "**SIX**" : ""
        }`
      )

      this._checkSnakeBiteorLadderJump(newPos)
      this._resolveOccupancyOverload()

      if (diceResult === 6 && persistence < 3) {
        this.props.enableDice()
        this.props.setPlayerPersistence(persistence + 1)
      } else {
        this.props.changePlayer()
        this.props.setPlayerPersistence(1)
      }
    }
  }

  _checkSnakeBiteorLadderJump(playerPos) {
    const {
      snakes,
      ladders,
      players: {
        current: { id },
      },
    } = this.props.game
    const snakeStartPosList = snakes.map(s => s.startPos)
    const ladderStartPosList = ladders.map(l => l.startPos)

    if (snakeStartPosList.indexOf(playerPos) !== -1) {
      /* busted */
      const snake = snakes.filter(s => s.startPos === playerPos)[0]
      this.props.movePlayer(snake.endPos)
      this.props.addSnakeBite()
      this.props.logMessage(
        `A snake ate Player ${id} at ${playerPos}, moved to block ${snake.endPos}`
      )
    }

    if (ladderStartPosList.indexOf(playerPos) !== -1) {
      /* got wings */
      const ladder = ladders.filter(l => l.startPos === playerPos)[0]
      this.props.movePlayer(ladder.endPos)
      this.props.addLadderHike()
      this.props.logMessage(
        `Player ${id} found Ladder at ${playerPos}, moved to block ${ladder.endPos}`
      )
    }
  }

  _resolveOccupancyOverload() {
    delay(() => {
      const {
        grid: { occupancy },
        players: { all },
      } = this.props.game
      const boxesWithMoreThanOneOccupants = Object.keys(occupancy).filter(
        box => occupancy[box] > 1
      )
      for (let box of boxesWithMoreThanOneOccupants) {
        const playersWithinBox = all.filter(player => player.pos == box)
        let count = 0
        for (let player of playersWithinBox) {
          this.props.changePlayerPositionInBox(player.id, count++)
        }
      }
    })
  }

  _addNewPlayer() {
    this.props.addNewPlayer()
    this._resolveOccupancyOverload()
  }
}

const mapStateToProps = state => ({
  game: state.game,
})

export default connect(
  mapStateToProps,
  {
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
  }
)(Game)
