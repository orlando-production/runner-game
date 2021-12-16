import React from 'react';
import { hydrate } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import type { AxiosError } from 'axios';
import { CookiesProvider } from 'react-cookie';
import { ConnectedRouter } from 'connected-react-router';
import { Provider as ReduxProvider } from 'react-redux';
import configureAppStore from './store';
import type { RootState } from './store';
import { App } from './components/App';
import InternalErrorPage from './pages/InternalErrorPage';
import registerServiceWorker from './serviceWorkerRegistration';

const { store, history } = configureAppStore(window.__INITIAL_STATE__);

const ErrorFallback = ({ error }: { error: Error }) => {
  const { message } = error || {};
  const { reason } = (error as AxiosError)?.response?.data || {};
  return <InternalErrorPage message={message} reason={reason} />;
};
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

declare global {
    interface Window {
        __INITIAL_STATE__: RootState;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

hydrate(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </ConnectedRouter>
      </ReduxProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
