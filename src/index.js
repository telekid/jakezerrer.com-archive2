import React from 'react';
import ReactDOM from 'react-dom';
import { UIView } from 'ui-router-react';

import styles from './styles.css';

import './routes';

ReactDOM.render(
  <div className={styles.container}>
    <UIView />
  </div>,
  document.getElementById('app')
);
