import React from 'react'
import _ from 'lodash'
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectFilterOptions, updateFilterOptions, removeFilterOption } from '../../features/userPreference/userPreferenceSlice'
import { getFavourites } from '../../features/cat/catSlice'

const Filter = () => {
    const DEBOUNCE_DELAY = 500
    const [query, setQuery] = React.useState('')
    const dispatch = useAppDispatch();
    const filterOptions = useAppSelector(selectFilterOptions)

    const searchByQuery = () => dispatch(updateFilterOptions({ query }))

    React.useEffect(() => {
        const debouncedFetch = _.debounce(searchByQuery, DEBOUNCE_DELAY)

        debouncedFetch()

        return () => debouncedFetch.cancel()
    }, [query])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value)
    }

    const handleFilterByFavourites = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target

        if (!checked) {
            return dispatch(removeFilterOption('isFavourite'))
        }

        dispatch(getFavourites())
        dispatch(updateFilterOptions({ isFavourite: checked }))
    }

    return (
        <FormGroup>
            <Paper
                component="form"
                variant="outlined"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search by name, origin, etc.."
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleSearchChange}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <FormControlLabel sx={{ ml: '6px' }} control={<Checkbox checked={filterOptions.isFavourite} onChange={handleFilterByFavourites} />} label="Favourites" />
            </Paper>
        </FormGroup>
    )
}
export default Filter