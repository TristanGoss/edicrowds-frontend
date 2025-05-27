import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../../pages/Contact';

test('renders contact page title', () => {
  render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/Contact Details/i)[0]).toBeInTheDocument();
});
