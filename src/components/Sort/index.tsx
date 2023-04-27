import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectSortOptions, updateSortOptions } from '../../features/userPreference/userPreferenceSlice'

const Sort = () => {
    const dispatch = useAppDispatch();
    const { options, sortBy, order } = useAppSelector(selectSortOptions)

    const handleSortChange = (value: string) => {
        const options = {
            sortBy: value,
            order
        }

        dispatch(updateSortOptions(options))
    }

    const handleSelectChange = (isDescending: boolean) => {
        const options = {
            sortBy,
            order: isDescending ? 'DESC' : 'ASC'
        }

        dispatch(updateSortOptions(options))
    }

    return (
        <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
            <InputLabel sx={{ background: 'white' }} size='normal' id="sort-by">Sort by:</InputLabel>
            <Select
                sx={{ minWidth: '180px' }}
                labelId="sort-by"
                value={sortBy}
                label="Age"
                onChange={event => handleSortChange(event.target.value)}
            >
                {options.map(option => <MenuItem value={option}>{option}</MenuItem>)}
            </Select>
            <FormControlLabel sx={{ ml: '6px' }} control={
                <Checkbox checked={order === 'DESC'} onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectChange(event.target.checked)} />
            } label="Descending" />
        </FormControl>
    )
}

export default Sort;
