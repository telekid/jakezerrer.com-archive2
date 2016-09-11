import React from 'react';
import styles from './styles.css';

export default function Home() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.name}>jake zerrer</h1>
      <p className={styles.title}>designer / software engineer</p>
      <ul className={styles.socialList}>
        <li><a href="https://github.com/telekid">github<span className={styles.trail}>.com/telekid</span></a></li>
        <li><a href="https://www.instagram.com/telekid/">instagram<span className={styles.trail}>.com/telekid</span></a></li>
        <li><a href="https://keybase.io/hz">keybase<span className={styles.trail}>.io/hz</span></a></li>
        <li><a href="https://www.linkedin.com/in/jakezerrer">linkedin<span className={styles.trail}>.com/u/jakezerrer</span></a></li>
      </ul>
    </div>
  );
}
