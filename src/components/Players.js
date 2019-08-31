import React from 'react';
import { styles } from '../styles';
import { MAX_PLAYERS } from '../config/variables';

export default class Players extends React.Component {
  render () {
    const { all, current: { id }, count:playersCount } = this.props.players;
    return (
      <div>
      <h1 style={styles.heading}>
        Players
        {
          playersCount < MAX_PLAYERS
          ?
          <button style={styles.addPlayerCta} onClick={() => { this.props.addNewPlayer() }}>Add</button>
          : null
        }
      </h1>
      {
        all.map((p, index) => {
          return (
            <Player player={p} currentPlayerId={id} key={`player_${index}`} />
          );
        })
      }
      </div>
    )
  }
}

class Player extends React.Component {
  render () {
    const { player: {id, pos, color}, currentPlayerId } = this.props;
    const highlight =  id === currentPlayerId ? {
      color: color,
      background: '#fff',
      borderColor: color,
    } : {}
    const playerStyle = {
      ...styles.player,
      background: color,
      borderColor: color,
      ...highlight
    }

    return (
      <div style={playerStyle}>
        {id}
      </div>
    )
  }
}
