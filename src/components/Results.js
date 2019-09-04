import React from 'react';
import { Sortable } from 'react-sortable';

const SortableResultItem = Sortable(props => (
  <div {...props} className="list-item">
    {props.children}
  </div>
));

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggingIndex: null,
      data: this.props.players,
    };
  }

  updateState(obj) {
    this.setState(obj);
  }

  render() {
    return (
      <section className="results-section results">
        <h1 className={'heading'}>نتایج مسابقه</h1>
        <div className="flexCenter resultsHolder">
          {this.state.data.map((playerStat, i) => {
            const { name, pos, diceLog, snakeBites, ladderHikes } = playerStat;
            return (
              <SortableResultItem
                key={i}
                updateState={this.updateState.bind(this)}
                items={this.state.data}
                draggingIndex={this.state.draggingIndex}
                sortId={i}
                outline="list"
              >
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
              this.props.startNewGame();
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
  }
}
