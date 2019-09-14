import React from 'react';
import { Sortable } from 'react-sortable';
import { connect } from 'react-redux';
import { restartGame } from '../actions/GameActions';

const SortableResultItem = Sortable(props => (
  <div {...props} className="list-item">
    {props.children}
  </div>
));

const Results = props => {
  return (
    <section className="results-section results">
      <h1 className={'heading'}>نتایج مسابقه</h1>
      <div className="flexCenter resultsHolder">
        {props.players.map((player, i) => {
          const { name, pos, diceLog, snakeBites, ladderHikes } = player;
          return (
            <SortableResultItem key={i} sortId={i} outline="list">
              <div className={'resultCard'}>
                <strong>{name}</strong>
                {pos === 100 ? '( برنده 🎲 )' : ''} {diceLog.length} پرتاب تاس
                &nbsp;
                <br />
                {diceLog.filter(dice => dice === 6).length} پرتاب جایزه‌دار{' '}
                <br />
                {snakeBites} برخورد با مار &nbsp;
                <br />
                {ladderHikes} جهش با نردبان
              </div>
            </SortableResultItem>
          );
        })}
      </div>
      <div className={'flexCenter'}>
        <button
          className={'btn big'}
          onClick={() => {
            props.restartGame();
          }}
        >
          <span className={'icon'} role="img" aria-label="easy">
            🚀
          </span>
          شروع بازی جدید
        </button>
      </div>
    </section>
  );
};

export default connect(
  null,
  { restartGame }
)(Results);
