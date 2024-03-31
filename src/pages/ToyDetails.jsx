import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import { loadToys, saveToy } from "../store/actions/toy.actions"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { ToyMsgs } from "../cmps/ToyMsg"
import { ToyReview } from "../cmps/ToyReview"

export function ToyDetails() {
    const { toyId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [toyToEdit, setToyToEdit] = useState(null)
    const [msg, setMsg] = useState(toyService.getEmptyMsg().msgs[0].txt)
    // const [review, setReview] = useState(toyService.getEmptyReview().reviews[0].rating)
    const [review, setReview] = useState(toyService.getEmptyReview().reviews[0].rating)


    useEffect(() => {
        if (toyId) {
            console.log(toyToEdit);
            toyService.getById(toyId)
                .then(toyToEdit => setToyToEdit(toyToEdit))
                // .then(loadToys())
                .catch(err => {
                    console.log('Had issues in toy details', err)
                    navigate('/toy')
                })
        }
    }, [setToyToEdit, ])

    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"];


    const handleSaveToySwal = () => {
        const checkboxesHtml = labels.map(label => 
            `<label><input type="checkbox" class="swal2-checkbox" name="labels" value="${label}" ${
                toyToEdit && toyToEdit.labels && toyToEdit.labels.includes(label) ? 'checked' : ''
            }/>${label}</label><br>`
        ).join('')

        Swal.fire({
            title: toyToEdit ? 'Edit Toy' : 'Add New Toy',
            html: `<input id="swal-name" class="swal2-input" placeholder="Name" value="${toyToEdit ? toyToEdit.name : ''}">
                   <input id="swal-price" type="number" class="swal2-input" placeholder="Price" value="${toyToEdit ? toyToEdit.price : ''}">
                   ${checkboxesHtml}
                   `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value
                const price = document.getElementById('swal-price').value
                const selectedLabels = labels.filter(label => document.querySelector(`input[value="${label}"]`).checked);
                if (!name || !price) {
                    Swal.showValidationMessage(`Please enter name and price`)
                    return false
                }
                return { name, price, labels: selectedLabels };
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const savedToy = { ...toyToEdit, ...result.value }
                saveToy(savedToy)
                Swal.fire('Saved!', '', 'success').then(() => navigate('/toy'))
            }
        })
    }
    async function onRemoveMsg(msgId) {
        try {
            console.log(msgId);
            await toyService.removeMsg(toyToEdit._id, msgId)
            setToyToEdit(toyToEdit)
            loadToys()
        } catch (err) {
            console.error('Failed to save message', err)
        }
    }


    if (!toyToEdit) return <div>Loading...</div>

    return toyToEdit ? (
        <section className="toy-details">
            <Link to="/toy"><button className='btn'>Back</button></Link>
            <article className="toy-details">
                <img src={`/img/${utilService.getRandomIntInclusive(1, 10)}.jpg`} alt="toy-img" />
                <div className="toy-details-info  ">
                    <h1>Toy Name: {toyToEdit.name}</h1>
                    <h5>Toy Price: ${toyToEdit.price}</h5>
                </div>
                <button className='btn' onClick={handleSaveToySwal}>Edit Toy</button>
            </article>
            <ToyReview toyToEdit={toyToEdit} review={review} setReview={setReview}/>
            <ToyMsgs toyToEdit={toyToEdit} msg={msg} setMsg={setMsg} />
            {toyToEdit.msgs ? (
                <div>
                    {toyToEdit.msgs.map((msg, idx) => (
                        <article key={idx} className="message">
                            <h4> Added by : <span> {msg.by.fullname}</span></h4>
                            <pre>{msg.txt}</pre>
                            {/* <p>Msg user id: {msg.by._id}</p> */}
                            <button className='btn' onClick={() => onRemoveMsg(msg.id)}>Delete message</button>
                        </article>
                    ))}

                </div>
            ) : (
                <h2>Write a message.</h2>
            ) }
        </section>
    ) : (
        <div>Loading...</div>
    )
}

