import React from 'react';
import { Provider } from 'react-redux';

import Layout from '../components/Layout/layout';
import SEO from '../components/Seo';
import store from '../redux/store';
import Game from '../components/Game/Game';

const Main = () => (
  <Layout>
    <SEO title="Snake and Ladders|بازی مار و پله" />
    <Provider store={store}>
      <Game />
    </Provider>
  </Layout>
);

export default Main;
