import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export function PageInput({filterByToEdit, handleChange}) {

    return (
        <Stack spacing={2}>
            <Pagination count={10} 
            value={filterByToEdit.pageIdx}
            onChange={handleChange}
            />
        </Stack>


    )
}