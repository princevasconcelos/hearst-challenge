import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/utils'

import Filter from '.';

test('prince', async () => {
  renderWithProviders(<Filter />)

  fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'nicecat' }})
  fireEvent.click(screen.getByText(/favourites/i))
  fireEvent.click(screen.getByText(/favourites/i))

  jest.runAllTimers()

  await waitFor(() => expect(screen.getByTestId('search-input')).toHaveAttribute('value', 'nicecat'))
})
