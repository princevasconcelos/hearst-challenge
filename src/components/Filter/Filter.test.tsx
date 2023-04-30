import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/utils'
import * as Hooks from '../../app/hooks';
import { updateFilterOptions, removeFilterOption } from '../../features/userPreference/userPreferenceSlice'
import Filter from '.';

test('should handle filter options selection', async () => {
  jest.useFakeTimers();
  const dispatch = jest.fn()
  const hooksSpy = jest.spyOn(Hooks, 'useAppDispatch')
    .mockImplementation(() => (args: any) => dispatch(args))

  renderWithProviders(<Filter />)
  
  fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'nicecat' }})
  fireEvent.click(screen.getByText(/favourites/i))
  fireEvent.click(screen.getByText(/favourites/i))

  await waitFor(() => expect(screen.getByTestId('search-input')).toHaveAttribute('value', 'nicecat'))

  jest.runAllTimers()

  expect(dispatch).toBeCalledTimes(4)
  expect(dispatch).toHaveBeenCalledWith({
    payload: { query: 'nicecat' },
    type: updateFilterOptions.type
  })
  expect(dispatch).toHaveBeenCalledWith({
    payload: {
      isFavourite: true
    },
    type: updateFilterOptions.type
  })
  expect(dispatch).toHaveBeenCalledWith({
    payload: 'isFavourite',
    type: removeFilterOption.type
  })

  hooksSpy.mockRestore()
})
