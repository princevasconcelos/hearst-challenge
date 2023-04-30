import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/utils';
import MOCK_BREEDS from '../../__tests__/MOCK_BREEDS.json';
import MOCK_FAVOURITE_LIST from '../../__tests__/MOCK_FAVOURITE_LIST.json';
import Details from './Details';
import * as Router from 'react-router-dom';
import { store } from '../../app/store';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn(),
}));

describe('Details', () => {
  const initialState = store.getState();
  const breeds = MOCK_BREEDS.slice(0, 1);
  const favourites = MOCK_FAVOURITE_LIST.slice(0, 1);

  test('should render card data with details', async () => {
    const routerSpy = jest
      .spyOn(Router, 'useParams')
      .mockReturnValue({ id: 'abys' });
    window.scrollTo = jest.fn();

    const preloadedState = {
      ...initialState,
      cat: {
        ...initialState.cat,
        breeds,
        favourites,
      },
    };

    renderWithProviders(<Details />, { preloadedState });

    expect(screen.getByText('Abyssinian')).toBeVisible();
    expect(
      screen.getByText(
        'The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.'
      )
    ).toBeVisible();
    expect(screen.getByText('14 - 15 years')).toBeVisible();
    expect(screen.getByText('7 - 10 pounds')).toBeVisible();
    expect(screen.getByText('Egypt')).toBeVisible();
    expect(screen.getByTestId('lazyloadimage')).toHaveAttribute(
      'src',
      breeds[0].image.url
    );

    expect(
      screen.getByText('Active, Energetic, Independent, Intelligent, Gentle')
    ).toBeVisible();
    expect(screen.getByText('Affection Level')).toBeVisible();
    expect(screen.getByText('Child Friendly')).toBeVisible();
    expect(screen.getByText('Dog Friendly')).toBeVisible();
    expect(screen.getByText('Energy Level')).toBeVisible();
    expect(screen.getByText('Adaptability')).toBeVisible();

    expect(screen.getAllByTestId('PetsIcon').length).toBe(22);

    routerSpy.mockRestore();
  });
});
