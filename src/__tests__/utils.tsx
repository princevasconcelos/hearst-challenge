import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import { setupStore, persistor } from '../app/store'
import type { AppStore, RootState } from '../app/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>,
    store?: any
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        {children}
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        )
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
