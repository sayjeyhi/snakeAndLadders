import React from 'react';
import SortableResultItem from './results/SortableResultItem';
import { styles } from '../styles';

export default class Results extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      draggingIndex: null,
      data: this.props.players
    }
  }

  updateState (obj) {
    this.setState(obj);
  }

  render () {
    return (
      <section className="results-section" style={styles.results}>
        <h1 style={styles.heading}>Results</h1>
        <div style={styles.inlineBlock} className="list">
        {
          this.state.data.map((playerStat, i) => {
            const { id, pos, color, path, diceLog, snakeBites, ladderHikes } = playerStat;
            return (
              <SortableResultItem
                key={i}
                updateState={this.updateState.bind(this)}
                items={this.state.data}
                draggingIndex={this.state.draggingIndex}
                sortId={i}
                outline="list">
                <div style={styles.resultCard}>
                  <strong>Player {id} </strong>{pos===100 ? '( winner )' : ''}<br />
                  {diceLog.length} Dice thrown, &nbsp;
                  {(diceLog.filter((dice) => dice === 6)).length} Six(s) rolled, &nbsp;
                  {snakeBites} Snake bites, &nbsp;
                  {ladderHikes} Ladder hikes
                </div>
              </SortableResultItem>
            )
          })
        }
        </div>
        <div>
          <button style={styles.restartCta} onClick={() =>{this.props.startNewGame()}}>
            Start new game
          </button>
        </div>
      </section>
    )
  }
}
