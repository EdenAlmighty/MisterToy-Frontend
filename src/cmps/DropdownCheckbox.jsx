import { useState } from "react"

export function DropdownCheckbox({ selectedOptions, handleCheckboxChange }) {
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
                    {options.map(option => (
                        <div key={option}>
                            <input
                                type="checkbox"
                                id={option}
                                value={option}
                                onChange={handleChange}
                                checked={selectedOptions.includes(option)}
                            />
                            <label htmlFor={option}>{option}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
