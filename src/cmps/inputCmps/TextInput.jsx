import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function TextInput({ handleChange, filterByToEdit }) {

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"

        >
            <TextField
                id="txt"
                name="txt"
                onChange={handleChange}
                label="Name"
                value={filterByToEdit.txt || ''}
                variant="outlined"
            />
        </Box>
    );
}
