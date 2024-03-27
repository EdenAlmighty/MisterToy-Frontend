import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import { saveToy } from "../store/actions/toy.actions"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"

export function ToyDetails() {
    const { toyId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [toyToEdit, setToyToEdit] = useState(null)

    useEffect(() => {
        if (toyId) {
            toyService.getById(toyId)
                .then(toyToEdit => setToyToEdit(toyToEdit))
                .catch(err => {
                    console.log('Had issues in toy details', err)
                    navigate('/toy') // Navigates back to toy list on error
                })
        }
    }, [setToyToEdit])

    const handleSaveToySwal = () => {
        Swal.fire({
            title: toyToEdit ? 'Edit Toy' : 'Add New Toy',
            html: `<input id="swal-name" class="swal2-input" placeholder="Name" value="${toyToEdit ? toyToEdit.name : ''}">
                   <input id="swal-price" type="number" class="swal2-input" placeholder="Price" value="${toyToEdit ? toyToEdit.price : ''}">`,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value
                const price = document.getElementById('swal-price').value
                if (!name || !price) {
                    Swal.showValidationMessage(`Please enter name and price`)
                    return false
                }
                return { name, price }
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const savedToy = { ...toyToEdit, ...result.value, _id: toyToEdit?._id }
                setToyToEdit(savedToy)
                dispatch(saveToy(savedToy))
                Swal.fire('Saved!', '', 'success').then(() => navigate('/toy'))
            }
        })
    }

    if (!toyToEdit) return <div>Loading...</div>

    return toyToEdit ? (
        <section className="toy-details">
            <Link to="/toy"><button>Back</button></Link>
            <article className="toy-details">
                <img src={`/img/${utilService.getRandomIntInclusive(1, 10)}.jpg`} alt="toy-img" />
                <div className="toy-details-info  ">
                    <h1>Toy Name: {toyToEdit.name}</h1>
                    <h5>Toy Price: ${toyToEdit.price}</h5>
                </div>
                    <button onClick={handleSaveToySwal}>Edit Toy</button>
            </article>
        </section>
    ) : (
        <div>Loading...</div>
    )
}
