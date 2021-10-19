import React from 'react';
import styles from './Footer.module.css';

export default function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/rafalmaciejewski/clickrace"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img alt="logo" className={styles.logo} src="/android-chrome-192x192.png" />
      </a>
    </footer>
  );
}
