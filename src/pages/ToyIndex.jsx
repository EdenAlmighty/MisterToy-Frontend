import { loadToys, removeToy, saveToy, setFilterBy } from "../store/actions/toy.actions"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toyService } from "../services/toy.service"
import { ToyList } from "../cmps/ToyList"
import { Link } from "react-router-dom"
import { ToyFilter } from "../cmps/ToyFilter"

export function ToyIndex() {

    // const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        console.log(filterBy);
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
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

    if (!toys) return <h1>Loading...</h1>

    console.log(toys);
    return (
        <div>
            <h1>Our Toys</h1>
            <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy}/>
            <main>
                <Link to='/toy/edit' ><button className="add-btn">Add Toy</button></Link>
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}