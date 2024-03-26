import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { toyService } from "../services/toy.service";
import { saveToy } from "../store/actions/toy.actions";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function ToyEdit() {

    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues with toy edit', err)
                navigate('/')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 100
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/')
            })
            .catch(err => {
                console.log('Had issues in toy details', err);
                showErrorMsg('Had issues in toy details')
            })
    }

    return (
        <section className="toy-edit">
            <h2> {toyToEdit._id ? 'Edit' : 'Add'} </h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name: </label>
                <input type="text"
                name="name"
                id="name"
                placeholder="Avocado Plushy"
                value={toyToEdit.name}
                onChange={handleChange}
                />
                
                <label htmlFor="price">Price: </label>
                <input type="number" 
                name="price"
                id="price"
                placeholder="$150"
                value={toyToEdit.price}
                onChange={handleChange}
                />

                <div>
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to='/'>Cancel</Link>
                </div>
            </form>
        </section>
    )
}