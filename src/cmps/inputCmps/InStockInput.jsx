import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export function InStockInput({ handleChange }) {

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Stock</InputLabel>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    aria-label="inStock"
                    name="inStock"
                    label="inStock"
                    onChange={handleChange}
                >
                    <MenuItem value="all" label="All" >All</MenuItem>
                    <MenuItem value={true} label="In Stock" >In Stock</MenuItem>
                    <MenuItem value={false} label="Out of Stock">Out of Stock</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
