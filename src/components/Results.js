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
        <div className="list inlineBlock">
          {this.state.data.map((playerStat, i) => {
            const {
              id,
              pos,
              color,
              path,
              diceLog,
              snakeBites,
              ladderHikes,
            } = playerStat;
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
                  <strong>بازیکن {id} </strong>
                  {pos === 100 ? '( winner )' : ''}
                  <br />
                  {diceLog.length} پرتاب تاس, &nbsp;
                  {diceLog.filter(dice => dice === 6).length} پرتاب جایزه‌دار,
                  &nbsp;
                  {snakeBites} برخورد با مار, &nbsp;
                  {ladderHikes} جهش با نردبان
                </div>
              </SortableResultItem>
            );
          })}
        </div>
        <div>
          <button
            className={'btn'}
            onClick={() => {
              this.props.startNewGame();
            }}
          >
            شروع بازی جدید
          </button>
        </div>
      </section>
    );
  }
}
