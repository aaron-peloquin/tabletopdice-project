import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ThemedApp from './ThemedApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<ThemedApp />, document.getElementById('root'));
registerServiceWorker();
