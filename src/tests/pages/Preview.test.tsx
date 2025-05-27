import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Preview from '../../pages/Preview';

vi.mock('../../components/MapDisplay', () => ({
  default: () => <div data-testid="mock-map">Mocked MapDisplay</div>,
}));

test('renders preview page title and text', () => {
  render(
    <MemoryRouter>
      <Preview />
    </MemoryRouter>
  );

  expect(screen.getAllByText(/Preview/i)[0]).toBeInTheDocument();
  expect(screen.getByText(/early preview of the Edinburgh Crowds interface/i)).toBeInTheDocument();
  expect(screen.getByTestId('mock-map')).toBeInTheDocument();
});