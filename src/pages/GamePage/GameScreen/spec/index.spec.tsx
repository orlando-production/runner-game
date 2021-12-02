import React from 'react';
import { render, screen } from 'utils/testing-library';
import userEvent from '@testing-library/user-event';
import GameScreen from '../GameScreen';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));
describe('Процесс игры', () => {
  beforeEach(() => {
    const setState = jest.fn();
    render(
      <GameScreen
        setGameState={setState}
        setFooterVisible={setState}
        points={0}
        setPoints={setState}
      />
    );
  });

  afterEach(() => {
    mockHistoryPush.mockReset();
  });

  it('На экране есть игровое полотно(canvas)', () => {
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('На экране есть таймер', () => {
    const timer = screen.getByLabelText('таймер');
    expect(timer).toBeInTheDocument();
  });

  it('На экране отображается количество очков игрока', () => {
    const points = screen.getByLabelText('подарки');
    expect(points).toBeInTheDocument();
  });

  it('На экране есть кнопка паузы', () => {
    const pauseButton = screen.getByAltText('pause');
    expect(pauseButton).toBeInTheDocument();
  });

  it('При клике на паузу появляется надпись "ПАУЗА"', () => {
    const pauseButton = screen.getByAltText('pause');
    userEvent.click(pauseButton);
    const pauseCapture = screen.getByText(/ПАУЗА/i);
    expect(pauseCapture).toBeInTheDocument();
  });
});
