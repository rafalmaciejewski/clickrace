import { GitHub } from '@mui/icons-material';
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
        <GitHub />
      </a>
    </footer>
  );
}
