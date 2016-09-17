import React from 'react';
import ReactDOM from 'react-dom';
import { UIView } from 'ui-router-react';

import Header from './components/Header';
import styles from './styles.css';

import './routes';

ReactDOM.render(
  <div className={styles.container}>
    <Header />
    <UIView />
  </div>,
  document.getElementById('app')
);
