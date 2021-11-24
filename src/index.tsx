import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import type { AxiosError } from 'axios';
import { App } from './components/App';
import InternalErrorPage from './pages/InternalErrorPage';
import registerServiceWorker from './serviceWorkerRegistration';

const ErrorFallback = ({ error }: { error: Error }) => {
  const { message } = error || {};
  const { reason } = (error as AxiosError)?.response?.data || {};
  return <InternalErrorPage message={message} reason={reason} />;
};

registerServiceWorker();

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
