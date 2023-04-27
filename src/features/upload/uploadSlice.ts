import { RootState } from '../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as CatService from '../../services/thecatapi'
import { AxiosResponse } from 'axios';
import { Image } from '../cat/catSlice';

interface Upload {
    id: string,
    url: string,
    originalImage: Image
}

interface CatState {
    images: Upload[],
    status: 'idle' | 'loading' | 'failed',
    error: string
}

const initialState: CatState = {
    images: [],
    status: 'idle',
    error: ''
}

interface PostImageProps {
    file: File,
    image?: Image
}

export const postImage = createAsyncThunk(
    'upload/postUploadImage',
    async (data: PostImageProps, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<Upload> = await CatService.postUploadImage(data.file)
            return {
                ...response.data,
                originalImage: data.image
            }
        } catch(error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteImage = createAsyncThunk(
    'upload/deleteUploadImage',
    async (imgId: string) => {
        await CatService.deleteUploadImage(imgId)
        return imgId
    }
)

export const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        cleanErrors: (state) => {
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postImage.pending, (state) => {
                state.status = 'loading'
                state.error = ''
            })
            .addCase(postImage.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = ''
                const overwriteIndex = state.images.findIndex(
                    f => f.originalImage.id === action.payload.originalImage?.id
                )
                overwriteIndex === -1
                    ? state.images.push(action.payload as Upload)
                    : state.images.splice(overwriteIndex, 1, action.payload as Upload)
            })
            .addCase(postImage.rejected, (state, action) => {
                state.status = 'failed'
                state.error = `${action.payload}`
                // state.images = []
            })
            .addCase(deleteImage.pending, (state) => {
                state.status = 'loading'
                state.error = ''
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.status = 'idle'
                state.error = ''
                state.images = state.images.filter(f => f.id !== action.payload)
            })
            // .addCase(deleteImage.rejected, (state, action) => {
            //     state.images = []
            // })
    }
})

export const { cleanErrors } = uploadSlice.actions

export const selectUploadedImages = (state: RootState) => state.upload.images
export const selectUploadedStatus = (state: RootState) => state.upload.status
export const selectUploadedError = (state: RootState) => state.upload.error

export default uploadSlice.reducer