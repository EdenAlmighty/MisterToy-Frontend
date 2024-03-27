import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service";
import { DropdownCheckbox } from "./DropdownCheckbox";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { toyService } from "../services/toy.service";

const toyLabels = toyService.getToyLabels()

export function ToyFilter({ onSetFilter, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const handleCheckboxChange = (selectedLabels) => {
        setFilterByToEdit(prevFilter => ({
            ...prevFilter,
            labels: selectedLabels
        }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        setFilterByToEdit(filterBy)
    }

    return (
        <section className="toy-filter flex justify-center align-center">
            <form onSubmit={onSubmit}>
                <div className="radio-sort flex justify-center align-center">

                    <label htmlFor="all">
                        <input defaultChecked
                            type="radio"
                            name="inStock"
                            value=""
                            id="all"
                            onChange={handleChange} /> All
                    </label>

                    <label htmlFor="available">
                        <input
                            type="radio"
                            name="inStock"
                            value={true}
                            id="available"
                            onChange={handleChange} /> In Stock
                    </label>

                    <label htmlFor="unavailable">
                        <input
                            type="radio"
                            name="inStock"
                            value={false}
                            id="unavailable"
                            onChange={handleChange} /> Out of Stock
                    </label>

                    <DropdownCheckbox
                        selectedOptions={filterByToEdit.labels}
                        handleCheckboxChange={handleCheckboxChange}
                        toyLabels={toyLabels}
                    />

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

