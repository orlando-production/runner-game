import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import type { AxiosError } from 'axios';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { App } from './components/App';
import InternalErrorPage from './pages/InternalErrorPage';
import { store } from './store';

const ErrorFallback = ({ error }: { error: Error }) => {
  const { message } = error || {};
  const { reason } = (error as AxiosError)?.response?.data || {};

  return (
    <InternalErrorPage message={message} reason={reason} />
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      <Provider store={store}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
