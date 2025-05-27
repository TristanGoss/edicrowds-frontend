import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Splash from '../../pages/Splash';

test('renders splash page title', () => {
  render(
    <MemoryRouter>
      <Splash />
    </MemoryRouter>
  );
  expect(screen.getAllByText(/Edinburgh Crowds/i)[0]).toBeInTheDocument();
});
