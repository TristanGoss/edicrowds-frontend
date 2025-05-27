import { render, screen } from '@testing-library/react';
import App from '../../App';

test('my first react unit test', () => {
  render(<App />);
  const titleElement = screen.getAllByText(/Edinburgh Crowds/i);
  expect(titleElement[0]).toBeInTheDocument();
});
