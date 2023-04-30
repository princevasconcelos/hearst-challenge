# The Cat App

## Live Url: https://princevasconcelos.github.io/hearst-challenge

Challenge application using React + Cat API for Hearst Communications
### Stack

1. React
2. Redux Toolkit
3. Redux Persist
4. Material-UI
5. Typescript
6. Lodash
7. Date-fns
8. Jest + RTL
9. Eslint + Prettier + Editorconfig

### Scripts

- Run local at port 3000: `npm run start`
- Run tests with jest and coverage: `npm run test`
- Deploy on Github Pages: `npm run deploy`
- Run linting: `npm run lint:fix`

### Functionalities

1. Get cat data from a public API (https://thecatapi.com/)
2. Favourite a cat
3. Upload a cat image
4. Sort and Filter cat list
5. Cache request for 30 minutes
6. Lazy load images
7. Persist data after reloads


## Requirements

- **(Storage):** Using redux-toolkit to store all data, divided into 3 reducers: Cat API (catSlice), filters/sort options(userPreferencesSlice) and upload images (uploadSlice)
```js
const rootReducer = combineReducers({ 
  cat: catReducer,
  userPreference: userPreferenceReducer,
  upload: uploadReducer,
})
```

- **(Persist):** Using redux-persist to store data into a local database and even after a page reloads, the data is avaliable to the user
```js
import storage from 'redux-persist/lib/
storage';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
```

- **(Lazy Load):** Using react-lazy-load-image-component to lazy load images to increase performance, so when user scrolls down, the browser download the images
```js
<LazyLoadImage
    src={cardMediaImage}
    width="100%"
    height={expanded ? '500' : '200'}
    placeholder={<Skeleton variant="rectangular" width={270} height={360} />}
    loading="lazy"
    style={{ objectFit: expanded ? 'contain' : 'cover' }}
/>
```

- **(Cache):** When user initially request the cat data from API, I save the current time of the user, so after 30 minutes, he will be using the cached data from redux instead of request again to the server
```js
// on catSlice
.addCase(getBreeds.fulfilled, (state, action) => {
    state.status = 'idle'
    state.breeds = action.payload
    state.cacheExpiresDate = new Date()
})

// using this function to calculate if is expired or not
export const selectShouldRevalidateData = (state: RootState) => {
    const { cacheExpiresDate } = state.cat
    const formatDate = typeof cacheExpiresDate === 'string'
        ? new Date(cacheExpiresDate)
        : cacheExpiresDate
    const now = new Date()
    const expiration = addMinutes(formatDate, CACHE_EXPIRATION_MINUTES)

    return isBefore(expiration, now)
}

// on Home.page.tsx
useEffect(() => {
    if (breeds.length === 0 || shouldRevalidateData) {
        dispatch(getBreeds())
        dispatch(getFavourites())
    }
}, [])
```

## Coverage

![Alt text](./public/coverage.png?raw=true "Coverage")
