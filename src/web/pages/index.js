import React from 'react';

import Layout from "./../../web/components/layout"
import SEO from "./../../web/components/seo"

// import {renderToNodeStream} from 'react-dom/server';
import {Provider} from 'react-redux';
import store from './../../store';
import Game from './../../components/Game';

//const domEntry = document.getElementById('snakes');

const Main = () => (
    <Layout>
        <SEO title="404: Not found" />
        <Provider store={store}>
            <Game />
        </Provider>
    </Layout>
);

export default Main;
