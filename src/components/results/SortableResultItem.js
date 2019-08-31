import React from 'react';
import { Sortable } from 'react-sortable';

class SortableResultItem extends React.Component {
  render () {
    return (
      <div {...this.props} className="list-item">{this.props.children}</div>
    );
  }
}

export default Sortable(SortableResultItem);
