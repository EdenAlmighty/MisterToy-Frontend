import { loadToys, removeToy, reorderToysAction, saveToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToyList } from "../cmps/ToyList"
import { NavLink } from 'react-router-dom'
import { ToyFilter } from "../cmps/ToyFilter"
import { ToySort } from "../cmps/ToySort"
import Swal from "sweetalert2"
import { ToyEdit } from "./ToyEdit"

export function ToyIndex() {
    const toys = useSelector((state) => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)
    const [toyToEdit, setToyToEdit] = useState('')

    // const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    console.log(toys)

    useEffect(() => {
        console.log(toys)

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

    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]


    const handleSaveToySwal = (toy) => {
        const checkboxesHtml = labels.map(label => 
            `<label><input type="checkbox" class="swal2-checkbox" name="${label}" value="${label}"/>${label}</label><br>`
        ).join('')
        

        Swal.fire({
            title: toy ? 'Edit Toy' : 'Add New Toy',
            html: `<input id="swal-name" class="swal2-input" placeholder="Name" value="${toy ? toy.name : ''}">
                   <input id="swal-price" type="number" class="swal2-input" placeholder="Price" value="${toy ? toy.price : ''}">
                   ${checkboxesHtml}
                   `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value
                const price = document.getElementById('swal-price').value
                const selectedLabels = labels.filter(label => document.querySelector(`input[value="${label}"]`).checked)
                if (!name || !price) {
                    Swal.showValidationMessage(`Please enter name and price`)
                    return false
                }
                return { name, price, labels: selectedLabels }
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const savedToy = { ...toy, ...result.value }
                saveToy(savedToy)
                Swal.fire('Saved!', '', 'success').then(() => navigate('/toy'))
            }
        })
    }

    const onReorderToys = (sourceIndex, destinationIndex) => {
        reorderToysAction(sourceIndex, destinationIndex)
    }
    

    return (
        <div>
            <h1>Our Toys</h1>
            <section className="main-control-container">
                <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
            </section>

            <main>
                <button onClick={() => handleSaveToySwal(toyToEdit)}>{toyToEdit ? 'Edit' : 'Add Toy'} </button>
                {toys ? (
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} onReorderToys={onReorderToys} />

                ) : <h1>Loading...</h1>}
                <hr />
            </main>
        </div>
    )
}