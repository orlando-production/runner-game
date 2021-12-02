import React from 'react';
import { render, screen } from 'utils/testing-library';
import FinishScreen from '../FinishScreen';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));
describe('Финиш игры', () => {
  const points = 5;
  beforeEach(() => {
    const setState = jest.fn();
    render(<FinishScreen setGameState={setState} points={points} />);
  });

  afterEach(() => {
    mockHistoryPush.mockReset();
  });

  it('На экране есть кнопка начала новой игры', () => {
    const startButton = screen.getByRole('button', { name: /Играть еще раз/i });
    expect(startButton).toBeInTheDocument();
  });

  it('На экране есть кнопка перехода в рейтинг', () => {
    const ratingButton = screen.getByRole('button', { name: /Рейтинг/i });
    expect(ratingButton).toBeInTheDocument();
  });

  it('На экране отображаются результаты оконченной игры с собранным количеством подарков', () => {
    const finalText = screen.getByText(
      new RegExp(`Ты помог дедушке собрать ${points} подарков`)
    );
    expect(finalText).toBeInTheDocument();
  });
});
