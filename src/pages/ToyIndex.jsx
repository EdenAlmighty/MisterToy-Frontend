import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyList } from "../cmps/ToyList"
import { NavLink } from 'react-router-dom'
import { ToyFilter } from "../cmps/ToyFilter"
import { ToySort } from "../cmps/ToySort"
import Swal from "sweetalert2"

export function ToyIndex() {
    const toys = useSelector((state) => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)

    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    console.log(toys);

    useEffect(() => {
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
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                })
                removeToy(toyId)
                    .then(() => {
                        showSuccessMsg('Toy removed')
                    })
                    .catch(err => {
                        showErrorMsg('Cannot remove toy')
                    })
            }
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

    return (
        <div>
            <h1>Our Toys</h1>
            <section className="main-control-container">
                <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
            </section>

            <main>
                <NavLink to='/toy/edit' ><button className="add-btn">Add Toy</button></NavLink>
                {toys ? (
                    <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />

                ) : <h1>Loading...</h1>}
                <hr />
            </main>
        </div>
    )
}