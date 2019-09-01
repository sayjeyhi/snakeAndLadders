import React from 'react';
import { MAX_PLAYERS } from '../selectors/variables';

export default class Players extends React.Component {
  render() {
    const {
      all,
      current: { id },
      count: playersCount,
    } = this.props.players;
    return (
      <>
        {all.map((p, index) => {
          return (
            <Player player={p} currentPlayerId={id} key={`player_${index}`} />
          );
        })}
        {playersCount < MAX_PLAYERS ? (
          <button
            className={'addPlayerCta'}
            onClick={() => {
              this.props.addNewPlayer();
            }}
          >
            +
          </button>
        ) : null}
      </>
    );
  }
}

class Player extends React.Component {
  render() {
    const {
      player: { id, pos, color },
      currentPlayerId,
    } = this.props;
    const highlight =
      id === currentPlayerId
        ? {
            color: color,
            background: '#fff',
            borderColor: color,
          }
        : {};
    const playerStyle = {
      background: color,
      borderColor: color,
      ...highlight,
    };

    return (
      <div className="player" style={playerStyle}>
        <img src={"./../images/avatars/" + id + ".png"} alt={id} />
      </div>
    );
  }
}
