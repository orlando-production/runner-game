import { useEffect, useRef, useState } from 'react';

const workerHandler = (fn: Function) => {
  onmessage = (event) => {
    postMessage(fn(event.data));
  };
};

export const useWebworker = (fn: Function) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const workerRef = useRef(null);

  useEffect(() => {
    const worker = new Worker(
      URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`]))
    );
    workerRef.current = worker;
    worker.onmessage = (event: MessageEvent) => setResult(event.data);
    worker.onerror = (error: ErrorEvent) => setError(error.message);
    return () => {
      worker.terminate();
    };
  }, [fn]);

  return {
    result,
    error,
    run: (value: any) => workerRef.current.postMessage(value)
  };
};
