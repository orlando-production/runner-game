import type { ReactElement } from 'react';
import type { EnhancedStore } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// @ts-ignore
import { History } from 'history';
import type { RootState } from '../store';
import { rootReducer } from '../store';

type Options = {
  preloadedState?: RootState;
  store?: EnhancedStore<RootState>;
  history?: History;
} & RenderOptions;

type WrapperProps = {
  children: ReactElement | ReactElement[];
};

const render = (ui: ReactElement, options: Options = {}) => {
  const {
    preloadedState,
    store = configureStore({
      reducer: rootReducer(options.history),
      preloadedState
    }),
    ...renderOptions
  } = options;

  function Wrapper({ children }: WrapperProps) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
