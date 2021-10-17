import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';

import '../subscriptions';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
