import { Link } from "react-router-dom"
import { utilService } from "../services/util.service"

export function ToyPreview({ toy }) {


    return (
        <Link to={`/toy/${toy._id}`}>
            <article className="toy-card">
                <img src={`img/${utilService.getRandomIntInclusive(1, 10)}.jpg`} alt="toy-img" />
                <div className="toy-details">
                    <h4>{toy.name}</h4>
                    <p style={{ color: toy.inStock ? 'black' : 'red' }}>
                        {toy.inStock ? `Price: $${toy.price.toLocaleString()}` : 'Currently unavailable'}
                    </p>
                </div>

            </article>
        </Link>
    )
}