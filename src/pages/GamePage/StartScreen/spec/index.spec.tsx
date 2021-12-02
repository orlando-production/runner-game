import React from 'react';
import { render, screen } from 'utils/testing-library';
import userEvent from '@testing-library/user-event';
import StartScreen from '../StartScreen';

describe('Начало игры', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(() => [0, setState]);
  beforeEach(() => {
    render(<StartScreen setGameState={setState} />);
  });
  it('На экране есть кнопка начала игры', () => {
    const startButton = screen.getByRole('button', { name: /Старт!/i });
    expect(startButton).toBeInTheDocument();
  });

  it('При клике на кнопку старта переходит на следующий экран', () => {
    const startButton = screen.getByRole('button', { name: /Старт!/i });
    userEvent.click(startButton);
    expect(setState).toHaveBeenCalledWith(1);
  });
});
