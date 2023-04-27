import { RootState } from '../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'

interface Sort {
    options: string[]
    sortBy: 'Name' | 'Imperial Weight' | 'Life Span' | 'Origin'
    order: 'ASC' | 'DESC',
}

export interface Filter {
    isFavourite?: boolean,
    query?: string
}

interface UserPreferenceState {
    sortOptions: Sort
    filterOptions: Filter
}

const initialState: UserPreferenceState = {
    sortOptions: {
        options: ['Name', 'Imperial Weight', 'Life Span', 'Origin'],
        sortBy: 'Name',
        order: 'ASC'
    },
    filterOptions: {}
}

export const userPreferenceSlice = createSlice({
    name: 'userPreference',
    initialState,
    reducers: {
        updateSortOptions: (state, action) => {
            state.sortOptions = {
                options: state.sortOptions.options,
                ...action.payload
            }
        },
        updateFilterOptions: (state, action: PayloadAction<Filter>) => {
            state.filterOptions = {
                ...state.filterOptions,
                ...action.payload
            }
        },
        removeFilterOption: (state, action: PayloadAction<string>) => {
            state.filterOptions = _.omit(state.filterOptions, [action.payload])
        }
    },
})

export const { updateSortOptions, updateFilterOptions, removeFilterOption } = userPreferenceSlice.actions

export const selectSortOptions = (state: RootState) => state.userPreference.sortOptions
export const selectFilterOptions = (state: RootState) => state.userPreference.filterOptions

export default userPreferenceSlice.reducer