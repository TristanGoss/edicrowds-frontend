import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';
import { MemoryRouter } from 'react-router-dom';

function renderFooterAt(pathname: string) {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <Footer />
    </MemoryRouter>
  );
}

test('renders footer static content and links', () => {
  renderFooterAt('/');

  expect(screen.getByText(/© Edinburgh Crowds/i)).toBeInTheDocument();
  expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
  expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  expect(screen.getByText(/Support The Project/i)).toBeInTheDocument();
  expect(screen.getByText(/info@edinburghcrowds.co.uk/i)).toBeInTheDocument();
});

test('highlights active internal link correctly', () => {
  renderFooterAt('/privacy');

  const privacyLink = screen.getByText(/Privacy Policy/i);
  const termsLink = screen.getByText(/Terms of Service/i);

  expect(privacyLink).toHaveClass('internal-link-active');
  expect(termsLink).not.toHaveClass('internal-link-active');
});

test('external links have correct attributes', () => {
  renderFooterAt('/');

  const supportLink = screen.getByText(/Support The Project/i);
  expect(supportLink).toHaveAttribute('target', '_blank');
  expect(supportLink).toHaveAttribute('rel', 'noopener noreferrer');

  const emailLink = screen.getByText(/info@edinburghcrowds.co.uk/i);
  expect(emailLink).toHaveAttribute('href', 'mailto:info@edinburghcrowds.co.uk');
});
