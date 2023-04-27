import React, { useEffect } from 'react';
import _ from 'lodash';
import Card from '../../components/Card'
import ImageList from '@mui/material/ImageList';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getBreeds, selectBreeds, selectFavourites, selectStatus, Cat, getFavourites, selectShouldRevalidateData } from '../../features/cat/catSlice'
import { selectSortOptions, selectFilterOptions, Filter } from '../../features/userPreference/userPreferenceSlice'
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterList from '../../components/Filter';
import Sort from '../../components/Sort';

function App() {
    const dispatch = useAppDispatch();
    const breeds = useAppSelector(selectBreeds)
    const favourites = useAppSelector(selectFavourites)
    const status = useAppSelector(selectStatus)
    const sortOptions = useAppSelector(selectSortOptions)
    const shouldRevalidateData = useAppSelector(selectShouldRevalidateData)
    const filterOptions = useAppSelector(selectFilterOptions)
    const isMobile = useMediaQuery('(max-width:600px)');

    const formatValueForComparison = (value: string) => Number(value.split(' ').at(0))

    const addSortFilterValues = (data: Cat[]) => data.map(cat => {
        const favourite = favourites.find(fav => fav.image_id === cat.image?.id)
        return {
            ...cat,
            isFavourite: Boolean(favourite),
            favouriteId: favourite?.id,
            imperial_weight: formatValueForComparison(cat.weight.imperial),
            life_span: formatValueForComparison(String(cat.life_span))
        }
    })

    const filterWithValues = (values: Filter) => {
        const { isFavourite, query = '' } = values
        const regx = new RegExp(query, 'gi')

        const withQuery = (item: any) => item.name.match(regx) ||
            item.origin.match(regx) ||
            String(item.life_span).match(regx) ||
            String(item.imperial_weight).match(regx)

        const withFavourite = (item: any) => item.isFavourite

        if (isFavourite && query) {
            return (obj: any) => withFavourite(obj) && withQuery(obj)
        }

        if (isFavourite) {
            return (obj: any) => withFavourite(obj)
        }

        if (query) {
            return (obj: any) => withQuery(obj)
        }

        return (item: Cat) => item
    }

    const catData = React.useMemo(() => {
        const dataComparasion = addSortFilterValues(breeds)

        const filtered = _.filter(
            dataComparasion,
            filterWithValues(filterOptions)
        )

        const sorted = _.orderBy(
            filtered,
            [sortOptions.sortBy.toLowerCase().replace(/\s/g, '_')],
            [sortOptions.order === 'ASC' ? 'asc' : 'desc']
        )

        return sorted
    }, [breeds, favourites, sortOptions, filterOptions]) as Cat[]

    useEffect(() => {
        console.log('prince shouldRevalidateData', shouldRevalidateData)
        if (breeds.length === 0 || shouldRevalidateData) {
            dispatch(getBreeds())
            dispatch(getFavourites())
        }
    }, [])

    const navigate = useNavigate();

    const onCardClick = (id: string) => navigate(`/${id}`);

    if (status === 'error') {
        return (
            <Alert severity="error">
                Something went wrong.. :(
            </Alert>
        )
    }

    return (
        <>
            {isMobile && <>
                <FilterList /> <br/>
                <Sort />
            </>}
            <ImageList
            sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
            gap={24}
            cols={4}
            >
                {status === 'loading' ?
                    Array.from({ length: 20 }).map(() => <Skeleton variant="rectangular" width={270} height={360} />):
                    catData.map(cat => <Card key={cat.id} {...cat} expanded={false} handleCardClick={onCardClick} />) 
                }
        </ImageList>
        </>
        
    )
}

export default App;
