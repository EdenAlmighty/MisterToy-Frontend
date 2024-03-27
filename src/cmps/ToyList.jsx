import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";


export function ToyList({ toys, onRemoveToy, onEditToy }) {
    console.log(toys);
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview clean-list " key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div className="actions-btns  ">
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                        <Link to={`/toy/${toy._id}`}><button>Details</button></Link> &nbsp; | &nbsp;
                        {/* <Link to={`/toy/${toy._id}`}>Details</Link> */}

                    </div>
                </li>
            )}
        </ul>
    )
}