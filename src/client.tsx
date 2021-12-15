import React from 'react';
import { hydrate } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import type { AxiosError } from 'axios';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { App } from './components/App';
import InternalErrorPage from './pages/InternalErrorPage';
import registerServiceWorker from './serviceWorkerRegistration';
import { store } from './store';

const ErrorFallback = ({ error }: { error: Error }) => {
  const { message } = error || {};
  const { reason } = (error as AxiosError)?.response?.data || {};
  return <InternalErrorPage message={message} reason={reason} />;
};
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

// global redeclared types
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
    }
}

hydrate(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
