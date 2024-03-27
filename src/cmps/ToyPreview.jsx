import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"

export function ToyPreview({ toy }) {


    return (
        <Link to={`/toy/${toy._id}`}>
        <article className="toy-card">
            <img src={`img/${utilService.getRandomIntInclusive(1, 10)}.jpg`} alt="toy-img" />
            <div className="toy-details pad1">
                <h4>{toy.name}</h4>
                <p>Price ${toy.price.toLocaleString()}</p>
            </div>

        </article>
        </Link>
    )
}