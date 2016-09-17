import React from 'react';
import ReactDOM from 'react-dom';

import styles from './styles.css';

import Home from './components/Home';

ReactDOM.render(
  <div className={styles.container}>
    <Home />
  </div>,
  document.getElementById('app')
);
