import reducer, {
  initialState,
  cleanErrors,
  postImage,
  deleteImage,
  selectUploadedError,
  selectUploadedStatus,
  selectUploadedImages,
} from './uploadSlice';
import MOCK_BREEDS from '../../__tests__/MOCK_BREEDS.json';
import MOCK_FAVOURITE_RESPONSE from '../../__tests__/MOCK_FAVOURITE_RESPONSE.json';
import { setupStore } from '../../app/store';
import { cleanup } from '@testing-library/react';
import * as thecatapi from '../../services/thecatapi';

describe('upload reducer', () => {
  afterEach(() => cleanup());

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle clean errors action', () => {
    expect(
      reducer({ ...initialState, error: 'Something wrong' }, cleanErrors())
    ).toEqual({ ...initialState, error: '' });
  });

  describe('createAsyncThunk', () => {
    it('postImage', async () => {
      const { image } = MOCK_BREEDS[0];
      const file = new File(['foo'], 'cat.txt', {
        type: 'text/plain',
      });

      const apiSpy = jest
        .spyOn(thecatapi, 'postUploadImage')
        // @ts-ignore
        .mockResolvedValue({
          data: MOCK_FAVOURITE_RESPONSE,
        });

      const store = setupStore();
      await store.dispatch(postImage({ file, image }));

      expect(apiSpy).toHaveBeenCalledTimes(1);
      expect(apiSpy).toHaveBeenCalledWith(file);

      apiSpy.mockRestore();
    });

    it('postImage rejected', async () => {
      const { image } = MOCK_BREEDS[0];
      const file = new File(['foo'], 'dog.txt', {
        type: 'text/plain',
      });

      const apiSpy = jest
        .spyOn(thecatapi, 'postUploadImage')
        // @ts-ignore
        .mockRejectedValue({
          response: {
            data: 'Something went wrong',
          },
        });

      const store = setupStore();
      await store.dispatch(postImage({ file, image }));

      expect(apiSpy).toHaveBeenCalledTimes(1);
      expect(apiSpy).toHaveBeenCalledWith(file);

      apiSpy.mockRestore();
    });

    it('deleteImage', async () => {
      const imgId = 'z0hz6WtA2';
      const apiSpy = jest
        .spyOn(thecatapi, 'deleteUploadImage')
        // @ts-ignore
        .mockResolvedValue();

      const store = setupStore();
      await store.dispatch(deleteImage(imgId));

      expect(apiSpy).toHaveBeenCalledTimes(1);
      expect(apiSpy).toHaveBeenCalledWith(imgId);

      apiSpy.mockRestore();
    });
  });

  describe('Image', () => {
    it('should set status to loaing when postImage is pending', () => {
      const action = { type: postImage.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({ ...initialState, status: 'loading', error: '' });
    });

    it('should set images data when postImage is fulfilled', () => {
      const action = {
        type: postImage.fulfilled.type,
        payload: MOCK_FAVOURITE_RESPONSE,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        images: [MOCK_FAVOURITE_RESPONSE],
      });
    });

    it('should overwrite image data when there is a previous upload for the current image', () => {
      const storedImage = {
        ...MOCK_FAVOURITE_RESPONSE,
        id: 'one',
        originalImage: {
          id: 'z0hz6WtA2',
          url: 'any',
        },
      };
      const newUploadImage = {
        ...MOCK_FAVOURITE_RESPONSE,
        id: 'two',
        originalImage: {
          id: 'z0hz6WtA2',
          url: 'any',
        },
      };
      const action = {
        type: postImage.fulfilled.type,
        payload: newUploadImage,
      };
      const state = reducer({ ...initialState, images: [storedImage] }, action);
      expect(state).toEqual({ ...initialState, images: [newUploadImage] });
    });

    it('sets status false when postImage is rejected', () => {
      const action = {
        type: postImage.rejected.type,
        payload: 'Something went wrong',
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        status: 'failed',
        error: 'Something went wrong',
      });
    });

    it('should set status to loaing when deleteImage is pending', () => {
      const action = { type: deleteImage.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({ ...initialState, status: 'loading' });
    });

    it('should remove image data when deleteImage is fulfilled', () => {
      const storedImage = {
        ...MOCK_FAVOURITE_RESPONSE,
        originalImage: {
          id: 'z0hz6WtA2',
          url: 'any',
        },
      };
      const action = {
        type: deleteImage.fulfilled.type,
        payload: storedImage.id,
      };
      const state = reducer({ ...initialState, images: [storedImage] }, action);
      expect(state).toEqual({ ...initialState, images: [] });
    });
  });

  describe('Selectors', () => {
    it('should selectUploadedImages', () => {
      const images = [
        {
          ...MOCK_FAVOURITE_RESPONSE,
          originalImage: {
            id: 'z0hz6WtA2',
            url: 'any',
          },
        },
      ];

      const store = setupStore({
        upload: {
          ...initialState,
          images,
        },
      });

      expect(selectUploadedImages(store.getState())).toEqual(images);
    });

    it('should selectUploadedStatus', () => {
      const store = setupStore({
        upload: {
          ...initialState,
          status: 'loading',
        },
      });

      expect(selectUploadedStatus(store.getState())).toBe('loading');
    });

    it('should selectUploadedError', () => {
      const store = setupStore({
        upload: {
          ...initialState,
          error: 'something went wrong',
        },
      });

      expect(selectUploadedError(store.getState())).toBe(
        'something went wrong'
      );
    });
  });
});
