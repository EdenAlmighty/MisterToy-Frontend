import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { saveToy } from '../store/actions/toy.actions'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toyService } from '../services/toy.service'

export function ToyEdit() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { toyId } = useParams()
    const [toyToEdit, setToyToEdit] = useState(null)

    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

    useEffect(() => {
        if (toyId) {
            toyService.getById(toyId).then(toy => setToyToEdit(toy))
        }
    }, [toyId])

    const handleSaveToySwal = () => {
        const checkboxesHtml = labels.map(label => 
            `<label><input type="checkbox" class="swal2-checkbox" name="labels" value="${label}" ${
                toyToEdit && toyToEdit.labels && toyToEdit.labels.includes(label) ? 'checked' : ''
            }/>${label}</label><br>`
        ).join('')

        Swal.fire({
            title: toyToEdit ? 'Edit Toy' : 'Add New Toy',
            html: `
                <input id="swal-name" class="swal2-input" placeholder="Name" value="${toyToEdit ? toyToEdit.name : ''}">
                <input id="swal-price" type="number" class="swal2-input" placeholder="Price" value="${toyToEdit ? toyToEdit.price : ''}">
                ${checkboxesHtml}
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value
                const price = document.getElementById('swal-price').value
                const selectedLabels = [...document.querySelectorAll(`input[name="labels"]:checked`)].map(input => input.value)
                if (!name || !price) {
                    Swal.showValidationMessage(`Please enter name and price`)
                    return false
                }
                return { name, price, labels: selectedLabels }
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const updatedToy = { ...toyToEdit, ...result.value }
                saveToy(updatedToy)
                Swal.fire('Saved!', '', 'success').then(() => navigate('/toy'))
            }
        })
    }

    return (
        <div>
            <h1>{toyToEdit ? 'Edit' : 'Add'} Toy</h1>
            <button className='btn' onClick={() => handleSaveToySwal(toyToEdit)}>{toyToEdit ? 'Edit' : 'Add'} Toy with Swal</button>
        </div>
    )
}
