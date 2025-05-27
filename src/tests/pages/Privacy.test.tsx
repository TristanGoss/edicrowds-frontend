import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Privacy from '../../pages/Privacy';

test('renders terms page title', () => {
  render(
    <MemoryRouter>
      <Privacy />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/Privacy Policy/i)[0]).toBeInTheDocument();
});
