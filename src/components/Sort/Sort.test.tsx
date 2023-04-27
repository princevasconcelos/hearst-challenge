import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../__tests__/utils'
import Sort from './';

test('Should render Sort component and handle change sort type and sort order', async () => {
  renderWithProviders(<Sort />)

  expect(screen.getByText('Name')).toBeVisible()

  fireEvent.change(screen.getByTestId('sort-select'), { target: { value: 'Imperial Weight' } })
  fireEvent.click(screen.getByText(/descending/i))
  fireEvent.click(screen.getByText(/descending/i))

  await waitFor(() => expect(screen.getByText('Imperial Weight')).toBeVisible())
})
