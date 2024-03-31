import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { DropdownCheckbox } from "./inputCmps/DropdownCheckbox"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"
import { toyService } from "../services/toy.service"
import { InStockInput } from "./inputCmps/InStockInput"
import { TextInput } from "./inputCmps/TextInput"
import { PageInput } from "./inputCmps/PageInput"

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
        <>
            <img src="img/banner.jpg"></img>
            <section className="toy-filter flex justify-center align-center">

                <form onSubmit={onSubmit}>
                    <div className="radio-sort flex justify-center align-center">
                        <TextInput handleChange={handleChange} filterByToEdit={filterByToEdit} />

                        <InStockInput handleChange={handleChange} />

                        <DropdownCheckbox
                            selectedOptions={filterByToEdit.labels}
                            handleCheckboxChange={handleCheckboxChange}
                            toyLabels={toyLabels}
                        />
                        {/* <PageInput handleChange={handleChange} filterByToEdit={filterByToEdit} /> */}
                    </div>

                </form>
            </section>
        </>
    )
}

