import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../../pages/About';

test('renders about page title', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );

  expect(screen.getAllByText(/About Edinburgh Crowds/i)[0]).toBeInTheDocument();
});
