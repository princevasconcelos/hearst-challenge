import { RootState } from './../../app/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as CatService from '../../services/thecatapi'
import { addMinutes, isBefore } from 'date-fns'

const CACHE_EXPIRATION_MINUTES = 30

interface Weight {
    imperial: string;
}

export interface Image {
    url: string;
    id: string;
}

export interface Favourite {
    id: number;
    image_id: string;
    image: Image;
}

export interface Cat {
    image?: Image;
    name: string;
    id: string;
    description: string;
    weight: Weight;
    life_span: string | number;
    origin: string;
    temperament: string;
    affection_level: number;
    child_friendly: number;
    dog_friendly: number;
    energy_level: number;
    adaptability: number;
}

export interface CatState {
    breeds: Cat[];
    cacheExpiresDate: Date;
    favourites: Favourite[];
    status: string;
}

export const initialState: CatState = {
    breeds: [],
    cacheExpiresDate: new Date(),
    favourites: [],
    status: 'idle',
}

export const getBreeds = createAsyncThunk(
    'cat/getBreeds',
    async () => {
        const response = await CatService.getBreeds()
        console.log(response.data)
        return response.data
    }
)

export const getFavourites = createAsyncThunk(
    'cat/getFavourites',
    async () => {
        const response = await CatService.getFavorites()
        return response.data
    }
)

export const postFavorite = createAsyncThunk(
    'cat/postFavorite',
    async (imageId: string) => {
        const response = await CatService.postFavorite(imageId)
        console.log(response)
        return {
            ...response.data,
            image_id: imageId
        }
    }
)

export const deleteFavorite = createAsyncThunk(
    'cat/deleteFavorite',
    async (favoriteId: number) => {
        await CatService.deleteFavorite(favoriteId)
        return favoriteId
    }
)


export const catSlice = createSlice({
    name: 'cat',
    initialState,
    reducers: {
        updateBreeds: (state, action: PayloadAction<Cat[]>) => {
            state.breeds = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBreeds.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getBreeds.fulfilled, (state, action) => {
                state.status = 'idle'
                state.breeds = action.payload
                state.cacheExpiresDate = new Date()
            })
            .addCase(getBreeds.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(getFavourites.fulfilled, (state, action: PayloadAction<Favourite[]>) => {
                state.favourites = action.payload
            })
            .addCase(postFavorite.fulfilled, (state, action: PayloadAction<Favourite>) => {
                state.favourites = [...state.favourites, action.payload]
            })
            .addCase(deleteFavorite.fulfilled, (state, action: PayloadAction<number>) => {
                state.favourites = state.favourites.filter(f => f.id !== action.payload)
            })
    }
})

export const { updateBreeds } = catSlice.actions

export const selectBreeds = (state: RootState) => state.cat.breeds
export const selectStatus = (state: RootState) => state.cat.status
export const selectFavourites = (state: RootState) => state.cat.favourites
export const selectShouldRevalidateData = (state: RootState) => {
    const { cacheExpiresDate } = state.cat
    const formatDate = typeof cacheExpiresDate === 'string'
        ? new Date(cacheExpiresDate)
        : cacheExpiresDate
    const now = new Date()
    const expiration = addMinutes(formatDate, CACHE_EXPIRATION_MINUTES)

    return isBefore(expiration, now)
}

export default catSlice.reducer