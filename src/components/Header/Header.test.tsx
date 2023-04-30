import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/utils';
import Header from '.';

describe('Header', () => {
  test('should not render filters on MOBILE', async () => {
    renderWithProviders(<Header />);

    fireEvent.click(screen.getByText('The Cat App'));

    expect(screen.queryByText('Sort by:')).toBeNull();
    expect(
      screen.queryByPlaceholderText('Search by name, origin, etc..')
    ).toBeNull();
  });

  test('should render filters on DESKTOP', async () => {
    const originalMatchMedia = window.matchMedia;

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: true,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    renderWithProviders(<Header />);

    expect(screen.getByText('Sort by:')).toBeVisible();
    expect(
      screen.getByPlaceholderText('Search by name, origin, etc..')
    ).toBeVisible();

    window.matchMedia = originalMatchMedia;
  });
});
