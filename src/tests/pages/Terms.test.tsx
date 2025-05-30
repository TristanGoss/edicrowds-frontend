import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Terms from '../../pages/Terms';

test('renders terms page title', () => {
  render(
    <MemoryRouter>
      <Terms />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/Terms of Service/i)[0]).toBeInTheDocument();
});
