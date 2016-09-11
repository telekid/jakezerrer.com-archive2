import React from 'react';
import ReactDOM from 'react-dom';

import styles from './styles.css';

import Home from './components/Home';

const ReactContainer = document.registerElement('react-container');

ReactDOM.render(
  <div className={styles.container}>
    <Home />
  </div>,
  document.querySelector('body').appendChild(new ReactContainer())
);
