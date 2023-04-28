import reducer, { updateBreeds, getBreeds, selectShouldRevalidateData, selectFavourites, selectStatus, selectBreeds, deleteFavorite, postFavorite, getFavourites, initialState } from './catSlice'
import MOCK_BREEDS from '../../__tests__/MOCK_BREEDS.json'
import MOCK_FAVOURITE_LIST from '../../__tests__/MOCK_FAVOURITE_LIST.json'
import MOCK_FAVOURITE_RESPONSE from '../../__tests__/MOCK_FAVOURITE_RESPONSE.json'
import { setupStore } from '../../app/store'
import { cleanup } from "@testing-library/react";
import * as thecatapi from '../../services/thecatapi'

describe('cat reducer', () => {
    const today = new Date('2023-12-31T03:00:00.000Z')

    beforeAll(() => jest.useFakeTimers().setSystemTime(today))
    afterEach(() => cleanup());
    afterAll(() => jest.clearAllTimers())

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(initialState)
    })

    it('should handle update breeds action', () => {
        expect(reducer(initialState, updateBreeds(MOCK_BREEDS))).toEqual({ ...initialState, breeds: MOCK_BREEDS })
    })
    describe('createAsyncThunk', () => {
        it('getBreeds', async () => {
            const apiSpy = jest.spyOn(thecatapi, 'getBreeds')
                // @ts-ignore
                .mockResolvedValue({
                    data: MOCK_BREEDS
                })

            const store = setupStore()
            await store.dispatch(getBreeds());

            expect(apiSpy).toHaveBeenCalledTimes(1)

            apiSpy.mockRestore()
        });

        it('getFavourites', async () => {
            const apiSpy = jest.spyOn(thecatapi, 'getFavorites')
                // @ts-ignore
                .mockResolvedValue({
                    data: MOCK_FAVOURITE_LIST
                })

            const store = setupStore()
            await store.dispatch(getFavourites());

            expect(apiSpy).toHaveBeenCalledTimes(1)

            apiSpy.mockRestore()
        });

        it('postFavorite', async () => {
            const imageId = '0XYvRd7oD'
            const apiSpy = jest.spyOn(thecatapi, 'postFavorite')
                // @ts-ignore
                .mockResolvedValue({
                    data: {
                        message: "SUCCESS",
                        id: 1708
                    }
                })

            const store = setupStore()
            await store.dispatch(postFavorite(imageId));

            expect(apiSpy).toHaveBeenCalledTimes(1)
            expect(apiSpy).toHaveBeenCalledWith(imageId)

            apiSpy.mockRestore()
        });

        it('deleteFavorite', async () => {
            const favoriteId = 101333746
            const apiSpy = jest.spyOn(thecatapi, 'deleteFavorite')
                // @ts-ignore
                .mockResolvedValue()

            const store = setupStore()
            await store.dispatch(deleteFavorite(favoriteId));

            expect(apiSpy).toHaveBeenCalledTimes(1)
            expect(apiSpy).toHaveBeenCalledWith(favoriteId)

            apiSpy.mockRestore()
        });
    })

    describe('Breeds', () => {
        it('should set status to loaing when getBreeds is pending', () => {
            const action = { type: getBreeds.pending.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({ ...initialState, status: 'loading' });
        });

        it('should set breeds data when fetchList is fulfilled', () => {
            const action = { type: getBreeds.fulfilled.type, payload: MOCK_BREEDS };
            const state = reducer(initialState, action);
            expect(state).toEqual({ ...initialState, status: 'idle', breeds: MOCK_BREEDS, cacheExpiresDate: today });
        });

        it('sets fetching false when fetchList is rejected', () => {
            const action = { type: getBreeds.rejected.type };
            const state = reducer(initialState, action);
            expect(state).toEqual({ ...initialState, status: 'failed' });
        });
    })

    describe('Favourites', () => {
        it('should set favourites data when getFavourites is fulfilled', () => {
            const action = { type: getFavourites.fulfilled.type, payload: MOCK_FAVOURITE_LIST };
            const state = reducer(initialState, action);
            expect(state).toEqual({ ...initialState, status: 'idle', favourites: MOCK_FAVOURITE_LIST });
        });

        it('should push new favourite when postFavorite is fulfilled', () => {
            const action = { type: postFavorite.fulfilled.type, payload: MOCK_FAVOURITE_RESPONSE };
            const state = reducer(initialState, action);
            expect(state).toEqual({ ...initialState, favourites: [MOCK_FAVOURITE_RESPONSE] });
        });

        it('should remove favourite when deleteFavorite is fulfilled', () => {
            const deleteId = MOCK_FAVOURITE_LIST[0].id
            const [_, second, third] = MOCK_FAVOURITE_LIST
            const action = { type: deleteFavorite.fulfilled.type, payload: deleteId };
            const state = reducer({ ...initialState, favourites: MOCK_FAVOURITE_LIST }, action);
            expect(state).toEqual({ ...initialState, favourites: [second, third] })
        });
    })

    describe('Selectors', () => {
        it('should selectBreeds', () => {
            const store = setupStore({
                cat: {
                    ...initialState,
                    breeds: MOCK_BREEDS
                }
            })

            expect(selectBreeds(store.getState())).toEqual(MOCK_BREEDS)
        });

        it('should selectStatus', () => {
            const store = setupStore({
                cat: {
                    ...initialState,
                    status: 'loading'
                }
            })

            expect(selectStatus(store.getState())).toBe('loading')
        });

        it('should selectFavourites', () => {
            const store = setupStore({
                cat: {
                    ...initialState,
                    favourites: MOCK_FAVOURITE_LIST
                }
            })

            expect(selectFavourites(store.getState())).toEqual(MOCK_FAVOURITE_LIST)
        });

        it('should return false when current time is before expiration time', () => {
            const store = setupStore({
                cat: {
                    ...initialState,
                    cacheExpiresDate: today
                }
            })

            expect(selectShouldRevalidateData(store.getState())).toBeFalsy()
        });

        it('should return true when current time is after expiration time', () => {
            const pastDate = new Date('2020-12-31T03:00:00.000Z')
            const store = setupStore({
                cat: {
                    ...initialState,
                    cacheExpiresDate: pastDate
                }
            })

            expect(selectShouldRevalidateData(store.getState())).toBeTruthy()
        });
    })
})