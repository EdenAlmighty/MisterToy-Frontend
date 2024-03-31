import { Button } from '@mui/material'
import React from 'react'
import SouthIcon from '@mui/icons-material/South';
import NorthIcon from '@mui/icons-material/North';

export function ToySort({ sortBy, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = {
            by,
            asc: sortBy.asc * -1,
        };
        console.log(updatedSort);
        onSetSort(updatedSort);
    }

    function getSortIcon(by) {
        if (sortBy.by !== by) return null;
        return sortBy.asc === 1 ? <NorthIcon /> : <SouthIcon />;
    }

    return (
        <section className="toy-sort">
            <Button className='btn' sx={{ mx: 1 }} onClick={() => handleSortChange('createdAt')}>
                Created {getSortIcon('createdAt')}
            </Button>
            <Button className='btn' sx={{ mx: 1 }} onClick={() => handleSortChange('name')}>
                Name {getSortIcon('name')}
            </Button>
            <Button className='btn' sx={{ mx: 1 }} onClick={() => handleSortChange('price')}>
                Price {getSortIcon('price')}
            </Button>
        </section>
    );
}

