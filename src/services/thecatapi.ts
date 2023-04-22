import axios from 'axios'
import { HTTP_GET_METHOD } from './utils'

const defaultParams = {
    limit: '20',
    order: 'ASC'
}

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'x-api-key': process.env.REACT_APP_API_KEY,
        'Content-Type': 'application/json',
    }
})

// export const getCatList = () => instance({
//     method: HTTP_GET_METHOD,
//     url: 'search',
//     params: {
//         limit: '10',
//         order: 'ASC'
//     }
// })

export const getCatBreeds = () => instance({
    method: HTTP_GET_METHOD,
    url: 'breeds',
    params: defaultParams
})

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'x-api-key': process.env.REACT_APP_API_KEY
    }
})


// https://api.thecatapi.com/v1/categories