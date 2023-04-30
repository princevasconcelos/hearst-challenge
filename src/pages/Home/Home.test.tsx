import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/utils';
import MOCK_BREEDS from '../../__tests__/MOCK_BREEDS.json';
import MOCK_FAVOURITE_LIST from '../../__tests__/MOCK_FAVOURITE_LIST.json';
import Home from './Home';
import * as thecatapi from '../../services/thecatapi';
import { store } from '../../app/store';

describe('Home', () => {
  const initialState = store.getState();
  const breeds = MOCK_BREEDS.slice(0, 1);
  const favourites = MOCK_FAVOURITE_LIST.slice(0, 1);

  test('should render error message when status is error', async () => {
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        status: 'error',
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('Something went wrong.. :(')).toBeVisible();
  });

  test('should render a list of skeletons when status is loading', async () => {
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        status: 'loading',
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getAllByTestId('skeleton').length).toBe(20);
  });

  test('should render filter list and sort on MOBILE', async () => {
    const originalMatchMedia = window.matchMedia;
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        status: 'loading',
      },
    };

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: true,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('Sort by:')).toBeVisible();
    expect(
      screen.getByPlaceholderText('Search by name, origin, etc..')
    ).toBeVisible();

    window.matchMedia = originalMatchMedia;
  });

  test('should render a list of cards', async () => {
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        breeds,
        favourites,
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('Abyssinian')).toBeVisible();
    expect(
      screen.getByText(
        'The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.'
      )
    ).toBeVisible();
    expect(screen.getByText('14 years')).toBeVisible();
    expect(screen.getByText('7 - 10')).toBeVisible();
    expect(screen.getByText('Egypt')).toBeVisible();
    expect(screen.getByTestId('lazyloadimage')).toHaveAttribute(
      'src',
      breeds[0].image.url
    );
  });

  test('should redirect to details page when clicks on a card', async () => {
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        breeds,
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    fireEvent.click(screen.getByTestId('lazyloadimage'));

    expect(window.location.href).toBe('http://localhost/abys');
  });

  test('should sort and filter data by NAME', async () => {
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        breeds: MOCK_BREEDS,
        favourites,
      },
      userPreference: {
        ...initialState.userPreference,
        filterOptions: { isFavourite: true, query: 'Aby' },
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('Abyssinian')).toBeVisible();
  });

  test('should sort and filter data by ORIGIN', async () => {
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        breeds: MOCK_BREEDS,
      },
      userPreference: {
        ...initialState.userPreference,
        filterOptions: { query: 'United States' },
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('American Bobtail')).toBeVisible();
  });

  test('should sort and filter data by LIFE SPAN', async () => {
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        breeds: MOCK_BREEDS,
      },
      userPreference: {
        ...initialState.userPreference,
        filterOptions: { query: '11' },
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('American Bobtail')).toBeVisible();
  });

  test('should sort and filter data by IMPERIAL WEIGHT', async () => {
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        breeds: MOCK_BREEDS,
      },
      userPreference: {
        ...initialState.userPreference,
        filterOptions: { query: '7' },
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('American Bobtail')).toBeVisible();
  });

  test('should filter all favorites', async () => {
    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        favourites,
        breeds: MOCK_BREEDS,
      },
      userPreference: {
        ...initialState.userPreference,
        filterOptions: { isFavourite: true },
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('Abyssinian')).toBeVisible();
  });

  test('should fetch cat and favorite data', async () => {
    jest.useFakeTimers();

    const apiSpy = jest
      .spyOn(thecatapi, 'getBreeds')
      // @ts-ignore
      .mockResolvedValue({
        data: breeds,
      });

    renderWithProviders(<Home />, { preloadedState: initialState });

    jest.runAllTimers();

    await waitFor(() => expect(screen.getByText('Abyssinian')).toBeVisible());

    apiSpy.mockRestore();
  });
});
