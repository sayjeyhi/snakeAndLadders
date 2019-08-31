import React from 'react';
// import {renderToNodeStream} from 'react-dom/server';
import {Provider} from 'react-redux';
import store from './../store';
import Game from './../components/Game';

//const domEntry = document.getElementById('snakes');

const Main = () => (
  <Provider store={store}>
    <Game />
  </Provider>
);

export default Main;
