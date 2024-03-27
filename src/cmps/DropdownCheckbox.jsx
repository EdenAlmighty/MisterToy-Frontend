import { useState } from "react"

export function DropdownCheckbox({ selectedOptions, handleCheckboxChange, toyLabels }) {
    const [isOpen, setIsOpen] = useState(false)

    const options = [
        "On wheels",
        "Box game",
        "Art",
        "Baby",
        "Doll",
        "Puzzle",
        "Outdoor",
        "Battery Powered"
    ]

    const handleChange = ({ target }) => {
        const { value, checked } = target
        let newSelectedOptions

        if (checked) {
            newSelectedOptions = [...selectedOptions, value]
        } else {
            newSelectedOptions = selectedOptions.filter(option => option !== value)
        }
        handleCheckboxChange(newSelectedOptions)
    }

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>+ Select Labels</button>
            {isOpen && (
                <div style={{ position: 'absolute', zIndex: 1, border: '1px solid #ccc', backgroundColor: '#fff', padding: '10px' }}>
                    {toyLabels.map(label => (
                        <div key={label}>
                            <input
                                type="checkbox"
                                id={label}
                                value={label}
                                onChange={handleChange}
                                checked={selectedOptions.includes(label)}
                            />
                            <label htmlFor={label}>{label}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
