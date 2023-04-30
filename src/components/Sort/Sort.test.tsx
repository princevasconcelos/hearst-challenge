import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/utils';
import * as Hooks from '../../app/hooks';
import { updateSortOptions } from '../../features/userPreference/userPreferenceSlice';

import Sort from './';

test('Should handle sort options change for type and order', async () => {
  const dispatch = jest.fn();
  const hooksSpy = jest
    .spyOn(Hooks, 'useAppDispatch')
    .mockImplementation(() => (args: any) => dispatch(args));

  renderWithProviders(<Sort />);

  expect(screen.getByText('Name')).toBeVisible();

  fireEvent.change(screen.getByTestId('sort-select'), {
    target: { value: 'Imperial Weight' },
  });
  fireEvent.click(screen.getByText(/descending/i));
  fireEvent.click(screen.getByText(/descending/i));

  expect(dispatch).toBeCalledTimes(3);
  expect(dispatch).toHaveBeenCalledWith({
    payload: {
      order: 'ASC',
      sortBy: 'Imperial Weight',
    },
    type: updateSortOptions.type,
  });
  expect(dispatch).toHaveBeenCalledWith({
    payload: {
      order: 'DESC',
      sortBy: 'Name',
    },
    type: updateSortOptions.type,
  });

  hooksSpy.mockRestore();
});
