import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import How from '../../pages/How';

test('renders how page title', () => {
  render(
    <MemoryRouter>
      <How />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/How It Works/i)[0]).toBeInTheDocument();
});
