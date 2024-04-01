import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { loadToys, saveToy } from "../store/actions/toy.actions"
import Swal from "sweetalert2"
import { ToyMsgs } from "../cmps/ToyMsg"
import { useSelector } from "react-redux"
import { ReviewIndex } from "./ReviewIndex"
import { uploadService } from "../services/upload.service"

export function ToyDetails() {
    const { toyId } = useParams()
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(null)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    // const [review, setReview] = useState(toyService.getEmptyReview().reviews[0].rating)

    const [msg, setMsg] = useState(toyService.getEmptyMsg().msgs[0].txt)
    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    })
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        if (toyId) {
            toyService.getById(toyId)
                .then(toyToEdit => {
                    console.log(toyToEdit);
                    setToyToEdit(toyToEdit)
                })
                // .then(loadToys())
                .catch(err => {
                    console.log('Had issues in toy details', err)
                    // navigate('/toy')
                })
        }
    }, [])
    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"];

    function onUploaded(imgUrl) {
        setToyToEdit({ ...toyToEdit, imgUrl })
    }



    const handleSaveToySwal = () => {

        const checkboxesHtml = labels.map(label =>
            `<label><input type="checkbox" class="swal2-checkbox" name="labels" value="${label}" ${toyToEdit && toyToEdit.labels && toyToEdit.labels.includes(label) ? 'checked' : ''
            }/>${label}</label><br>`
        ).join('')

        const imgInputHtml =
            `<div>
            <img id="swal-img-preview" src="${imgData.imgUrl}" style="max-width: 150px; display: ${imgData.imgUrl ? 'block' : 'none'}; margin: 10px 0;" />
            <input type="file" accept="image/*" id="swal-image-upload" class="swal2-input" />
        </div>`


        Swal.fire({
            title: toyToEdit ? 'Edit Toy' : 'Add New Toy',
            html: `<input id="swal-name" class="swal2-input" placeholder="Name" value="${toyToEdit ? toyToEdit.name : ''}">
                   <input id="swal-price" type="number" class="swal2-input" placeholder="Price" value="${toyToEdit.price}">
                   ${checkboxesHtml}
                   ${imgInputHtml}
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
            didOpen: () => {
                document.getElementById('swal-image-upload').onchange = async (ev) => {
                    setIsUploading(true);
                    const file = ev.target.files[0];
                    if (file) {
                        const { secure_url } = await uploadService.uploadImg(file);
                        setImgData({ imgUrl: secure_url, width: 500, height: 500 }); 
                        document.getElementById('swal-img-preview').src = secure_url;
                        document.getElementById('swal-img-preview').style.display = 'block';
                        setIsUploading(false);
                        onUploaded(secure_url); 
                    }
                };
            },
        })
            .then((result) => {
                if (result.isConfirmed && result.value) {
                    const savedToy = { ...toyToEdit, ...result.value, }
                    saveToy(savedToy)
                    Swal.fire('Saved!', '', 'success')
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
            <NavLink to="/toy"><button className='btn'>Back</button></NavLink>
            <article className="toy-details">
                <img src={toyToEdit.imgUrl} alt="toy-img" />
                <div className="toy-details-info  ">
                    <h1>{toyToEdit.name}</h1>
                    <h5>${toyToEdit.price}</h5>
                </div>
                <button className='btn' onClick={handleSaveToySwal}>Edit Toy</button>
            </article>
            <ReviewIndex reviews={reviews} loggedInUser={loggedInUser} toyToEdit={toyToEdit} />

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
            )}
        </section>
    ) : (
        <div>Loading...</div>
    )
}

