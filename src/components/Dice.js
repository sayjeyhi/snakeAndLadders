import React, { useState } from 'react';

const Dice = props => {
  const { choosed } = props;

  const choosedClass = `show-${choosed || 4}`;
  return (
    <section id="cubeContainer">
      <div id="cube" className={'show-spining ' + choosedClass}>
        <figure className="front">1</figure>
        <figure className="back">2</figure>
        <figure className="right">3</figure>
        <figure className="left">4</figure>
        <figure className="top">5</figure>
        <figure className="bottom">6</figure>
      </div>
    </section>
  );
};

export default Dice;
