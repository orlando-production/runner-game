import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import type { AxiosError } from 'axios';
import { Provider } from 'react-redux';
import { App } from './components/App';
import InternalErrorPage from './pages/InternalErrorPage';
import { createApp } from './store';

const initialState = (window as any).__INITIAL_STATE__ || {};

const { store } = createApp(initialState);

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
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
