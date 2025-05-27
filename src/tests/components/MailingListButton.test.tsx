import { render, screen } from '@testing-library/react';
import MailingListButton from '../../components/MailingListButton';

test('renders mailing list button with correct attributes', () => {
  render(<MailingListButton />);

  const button = screen.getByRole('link', { name: /join the mailing list/i });

  expect(button).toBeInTheDocument();
  expect(button.getAttribute('href')).toMatch(/^https:\/\/forms\.gle\//);
  expect(button).toHaveAttribute('target', '_blank');
  expect(button).toHaveAttribute('rel', 'noopener noreferrer');
  expect(button).toHaveClass('link-button');
});
