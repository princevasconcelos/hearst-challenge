import reducer, {
  initialState,
  updateSortOptions,
  updateFilterOptions,
  removeFilterOption,
  selectSortOptions,
  selectFilterOptions,
} from './userPreferenceSlice';
import { setupStore } from '../../app/store';
import { cleanup } from '@testing-library/react';

describe('userPreferenceSlice reducer', () => {
  afterEach(() => cleanup());

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle updateSortOptions action', () => {
    const newSortOptions = {
      sortBy: 'Imperial Weight',
      order: 'ASC',
    };
    expect(reducer(initialState, updateSortOptions(newSortOptions))).toEqual({
      ...initialState,
      sortOptions: { ...initialState.sortOptions, ...newSortOptions },
    });
  });

  it('should handle updateFilterOptions action', () => {
    const newFiltersOption = {
      isFavourite: true,
    };
    expect(
      reducer(initialState, updateFilterOptions(newFiltersOption))
    ).toEqual({
      ...initialState,
      filterOptions: { ...initialState.filterOptions, ...newFiltersOption },
    });
  });

  it('should handle removeFilterOption action', () => {
    const filterOptionToRemove = 'isFavourite';
    expect(
      reducer(
        { ...initialState, filterOptions: { isFavourite: true } },
        removeFilterOption(filterOptionToRemove)
      )
    ).toEqual({ ...initialState, filterOptions: {} });
  });

  describe('Selectors', () => {
    it('should selectSortOptions', () => {
      const store = setupStore({
        userPreference: {
          ...initialState,
          sortOptions: {
            options: [],
            order: 'ASC',
            sortBy: 'Name',
          },
        },
      });

      expect(selectSortOptions(store.getState())).toEqual({
        options: [],
        order: 'ASC',
        sortBy: 'Name',
      });
    });

    it('should selectFilterOptions', () => {
      const store = setupStore({
        userPreference: {
          ...initialState,
          filterOptions: {
            isFavourite: true,
          },
        },
      });

      expect(selectFilterOptions(store.getState())).toEqual({
        isFavourite: true,
      });
    });
  });
});
