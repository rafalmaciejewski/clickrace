import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Game from '../components/Game';
import { Leaderboard } from '../components/Leaderboard';
import { RegistrationForm } from '../components/RegistrationForm';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>clickrace</title>
      <meta
        name="description"
        content="Online game to determine the fastest clicker in the world"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>ClickRace!</h1>

      <p className={styles.description}>Who is the fastest clicker?</p>

      <Game />
    </main>

    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        all rights reserved of course
      </a>
    </footer>
  </div>
);

export default Home;
