import React from 'react';
import ReactDOM from 'react-dom';

// Service worker
import * as serviceWorker from 'common/serviceWorker';

// App
import App from './App';

//redux
import Reducers  from "common/reducers/index";
import { createStore ,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(Reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
