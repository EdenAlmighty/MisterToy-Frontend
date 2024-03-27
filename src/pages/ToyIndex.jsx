import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyList } from "../cmps/ToyList"
import { NavLink } from 'react-router-dom'
import { ToyFilter } from "../cmps/ToyFilter"
import { ToySort } from "../cmps/ToySort"

export function ToyIndex() {

    // const dispatch = useDispatch()
    // const toys = useSelector(storeState => storeState.toyModule.toys)
    const toys = useSelector((state) => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)

    // const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    console.log(toys);
    // const [sortBy, setSort] = useState('price')

    useEffect(() => {
        // console.log(filterBy);
        console.log(toys);

        loadToys(filterBy, sortBy)
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sort) {
        setSortBy(sort)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onEditToy(toy) {
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated price $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update car')
            })
    }



    // function toysForDisplay() {
    //     let sortedToys = [...toys]
    //     if (sortBy === 'txt') {
    //         sortedToys = sortedToys.sort((a, b) => a.name.localeCompare(b.name));
    //     } else {
    //         sortedToys = sortedToys.sort((a, b) => a.price - b.price);
    //     }
    //     return sortedToys
    // }

    if (!toys || !toys.length) return <h1>Loading...</h1>
    console.log(toys);
    if (isLoading) return <h1>Loading...</h1>

    return (
        <div>
            <h1>Our Toys</h1>
            <section className="main-control-container">
                <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
            </section>

            <main>
                <NavLink to='/toy/edit' ><button className="add-btn">Add Toy</button></NavLink>
                <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                />

                {/* {!isLoading
                    ? <ToyList
                        toys={toysForDisplay()}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                    : <div>Loading...</div>
                } */}
                <hr />
            </main>
        </div>
    )
}