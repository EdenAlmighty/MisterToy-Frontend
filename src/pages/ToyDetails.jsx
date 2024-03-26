import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('toyId', toyId)
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate(`/toy/edit/${toy._id}`)
            })
    }
    if(!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy Name: {toy.name}</h1>
            <h5>Toy Price: {toy.price}</h5>
            <Link to={`/edit/${toy._id}`}><button>Edit</button></Link> &nbsp; | &nbsp;
            <Link to={`/`}>Back</Link>
        </section>
    )
}