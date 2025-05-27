import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../../components/Navbar';
import { MemoryRouter } from 'react-router-dom';

function renderNavbarAt(pathname: string) {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <Navbar />
    </MemoryRouter>
  );
}

test('renders all desktop links', () => {
  renderNavbarAt('/');

  const expectedLabels = [
    /Home/i,
    /About/i,
    /Preview/i,
    /How it works/i,
    /Contact/i,
  ];

  for (const label of expectedLabels) {
    const matches = screen.getAllByRole('link', { name: label });
    expect(matches.length).toBeGreaterThan(0);
    matches.forEach(link => {
      expect(link).toBeInTheDocument();
    });
  }
});

test('toggles mobile menu open/close', () => {
  renderNavbarAt('/');

  const toggleButton = screen.getByRole('button');
  const mobileMenu = screen.getByTestId('navbar-mobile');

  // Initially closed
  expect(mobileMenu).toHaveClass('max-h-0');
  expect(mobileMenu).toHaveClass('opacity-0');

  // Open menu
  fireEvent.click(toggleButton);
  expect(mobileMenu).toHaveClass('max-h-96');
  expect(mobileMenu).toHaveClass('opacity-100');

  // Close menu again
  fireEvent.click(toggleButton);
  expect(mobileMenu).toHaveClass('max-h-0');
  expect(mobileMenu).toHaveClass('opacity-0');
});


test('highlights current page in navbar', () => {
  renderNavbarAt('/about');

  const aboutLink = screen.getAllByRole('link', { name: /About/i });

  // One is desktop, one is mobile — both should have active class
  aboutLink.forEach(link => {
    expect(link).toHaveClass('internal-link-active');
  });

  const homeLink = screen.getAllByRole('link', { name: /Home/i });
  homeLink.forEach(link => {
    expect(link).not.toHaveClass('internal-link-active');
  });
});
