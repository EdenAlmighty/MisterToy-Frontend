import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service";

export function ToyFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    // const [filterBy, setFilterBy] = useState({ txt: '', price: 0, inStock: 'all', pageIdx: 0 })
    // const debouncedSetFilterRef = useRef(utilService.debounce(onSetFilter, 300))
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))


    useEffect(() => {
        
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        console.log('boom', value);

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterBy)
    }

    return (
        <section className="toy-filter flex justify-center align-center">
            <form onSubmit={onSubmit}>
                <div className="radio-sort flex justify-center align-center">

                    <label htmlFor="all">
                        <input defaultChecked
                            type="radio"
                            name="inStock"
                            value="all"
                            id="all"
                            onChange={handleChange} /> All
                    </label>

                    <label htmlFor="available">
                        <input
                            type="radio"
                            name="inStock"
                            value="available"
                            id="available"
                            onChange={handleChange} /> In Stock
                    </label>

                    <label htmlFor="unavailable">
                        <input
                            type="radio"
                            name="inStock"
                            value="unavailable"
                            id="unavailable"
                            onChange={handleChange} /> Out of Stock
                    </label>
                </div>

                <div className="search-inputs">
                    <input
                        className="filter-input"
                        placeholder="Search toys..."
                        name="txt"
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                    />
                    <label htmlFor="pageIdx">Page:</label>
                    <input type="number"
                        id="pageIdx"
                        name="pageIdx"
                        placeholder="0"
                        value={filterByToEdit.pageIdx}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </section>
    )
}

{/* <option value="">Label</option>
                <option value="On wheels">On wheels</option>
                <option value="Box game">Box game</option>
                <option value="Art">Art</option>
                <option value="Baby">Baby</option>
                <option value="Doll">Doll</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Battery Powered">Battery Powered</option> */}