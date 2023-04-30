import { fireEvent, screen, act } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/utils';
import MOCK_BREEDS from '../../__tests__/MOCK_BREEDS.json';
import Card from '.';
import * as CatReducer from '../../features/cat/catSlice';
import * as UploadReducer from '../../features/upload/uploadSlice';
import { store } from '../../app/store';
import * as Hooks from '../../app/hooks';

describe('Card', () => {
  const breeds = MOCK_BREEDS.slice(0, 1);

  test('should handle delete favorite', async () => {
    const favouriteId = 101333746;
    const deleteFavorite = jest.fn();
    jest
      .spyOn(CatReducer, 'deleteFavorite')
      .mockImplementation((args: any) => deleteFavorite(args));

    renderWithProviders(
      <Card
        {...breeds[0]}
        favouriteId={favouriteId}
        isFavourite={true}
        expanded={false}
      />
    );

    act(() => fireEvent.click(screen.getByTestId('FavoriteIcon')));

    expect(deleteFavorite).toHaveBeenCalledTimes(1);
    expect(deleteFavorite).toHaveBeenCalledWith(favouriteId);
  });

  test('should handle favorite item', async () => {
    const postFavorite = jest.fn();
    jest
      .spyOn(CatReducer, 'postFavorite')
      .mockImplementation((args: any) => postFavorite(args));

    renderWithProviders(
      <Card {...breeds[0]} isFavourite={false} expanded={false} />
    );

    act(() => fireEvent.click(screen.getByTestId('FavoriteIcon')));

    expect(postFavorite).toHaveBeenCalledTimes(1);
    expect(postFavorite).toHaveBeenCalledWith('0XYvRd7oD');
  });

  test('should clean erros on mount', async () => {
    const dispatch = jest.fn();
    const cleanErrors = jest.fn();
    const initialState = store.getState();
    const preloadedState = {
      ...initialState,
      upload: {
        ...initialState.upload,
        error: 'something went wrong',
      },
    };

    const uploadSpy = jest
      .spyOn(UploadReducer, 'cleanErrors')
      .mockImplementation((args: any) => cleanErrors(args));

    const hooksSpy = jest
      .spyOn(Hooks, 'useAppDispatch')
      .mockImplementation(() => (args: any) => dispatch(args));

    renderWithProviders(
      <Card {...breeds[0]} isFavourite={false} expanded={false} />,
      { preloadedState }
    );

    expect(cleanErrors).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('something went wrong')).toBeNull();

    hooksSpy.mockRestore();
    uploadSpy.mockRestore();
  });
});
