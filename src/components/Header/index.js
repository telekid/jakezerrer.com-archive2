import React from 'react';

import { UISref, UISrefActive } from 'ui-router-react';

import styles from './styles.css';

const pages = [
  {
    name: 'Home',
    route: 'home',
  }, {
    name: 'Recent Work',
    route: 'recent',
  },
];

export default function Header() {
  return (
    <nav className={styles.header}>
      <ul className={styles.list}>
        {
          pages.map(page =>
            <UISrefActive class={styles.active} key={page.route}>
              <li className={styles.listItem}>
                <UISref to={page.route}>
                  <a>{page.name}</a>
                </UISref>
              </li>
            </UISrefActive>
          )
        }
      </ul>
    </nav>
  );
}
