
export function ToySort({ onSetSort }) {

    function onChange(ev) {
        onSetSort(ev.target.value)
    }

    return (
        <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select onChange={onChange} id="sort">
                <option value="price">Price</option>
                <option value="txt">Text</option>
            </select>
        </div>
    )
}
