import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { loadToys, removeToy, reorderToysAction, saveToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useDispatch, useSelector } from "react-redux"
import { uploadService } from "../services/upload.service"
import { ToyList } from "../cmps/ToyList"
import { ToyFilter } from "../cmps/ToyFilter"
import { ToySort } from "../cmps/ToySort"
import Swal from "sweetalert2"


export function ToyIndex() {
    const toys = useSelector((state) => state.toyModule.toys)
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const sortBy = useSelector(state => state.toyModule.sortBy)
    const [toyToEdit, setToyToEdit] = useState(null)
    const [imgData, setImgData] = useState({
        imgUrl: null,
        height: 500,
        width: 500,
    })
    const [isUploading, setIsUploading] = useState(false)


    useEffect(() => {
        loadToys(filterBy, sortBy)
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSort(sort) {
        setSortBy(sort)
    }

    function onRemoveToy(toyId) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                })
                removeToy(toyId)
                    .catch(err => {
                        showErrorMsg('Cannot remove toy')
                    })
            }
        })

    }

    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

    function onUploaded(imgUrl) {
        setToyToEdit({ ...toyToEdit, imgUrl })
    }

    const handleSaveToySwal = () => {
        const checkboxesHtml = labels.map(label =>
            `<label><input type="checkbox" class="swal2-checkbox" name="${label}" value="${label}"/>${label}</label><br>`
        ).join('')

        const imgInputHtml =
            `<div>
            <img id="swal-img-preview" src="${imgData.imgUrl}" style="max-width: 150px; display: ${imgData.imgUrl ? 'block' : 'none'}; margin: 10px 0;" />
            <input type="file" accept="image/*" id="swal-image-upload" class="swal2-input" />
        </div>`

        Swal.fire({
            title: toyToEdit ? 'Edit Toy' : 'Add New Toy',
            html: `<input id="swal-name" class="swal2-input" placeholder="Name" value="${toyToEdit ? toyToEdit.name : ''}">
                   <input id="swal-price" type="number" class="swal2-input" placeholder="Price" value="${toyToEdit ? toyToEdit.price : ''}">
                   ${checkboxesHtml}
                   ${imgInputHtml}

                   `,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value
                const price = document.getElementById('swal-price').value
                const selectedLabels = labels.filter(label => document.querySelector(`input[value="${label}"]`).checked)

                if (!name || !price) {
                    Swal.showValidationMessage(`Please enter name and price`)
                    return false
                }
                return { name, price, labels: selectedLabels, imgUrl: imgData.imgUrl}
            },
            didOpen: () => {
                document.getElementById('swal-image-upload').onchange = async (ev) => {
                    setIsUploading(true);
                    const file = ev.target.files ? ev.target.files[0] : null;
                    if (!file) {
                        console.error('No file selected');
                        setIsUploading(false);
                        return;
                    }
            
                    try {
                        const { secure_url } = await uploadService.uploadImg(file); // Pass the file directly here
                        setImgData({ imgUrl: secure_url, width: 500, height: 500 });
                        document.getElementById('swal-img-preview').src = secure_url;
                        document.getElementById('swal-img-preview').style.display = 'block';
                        setIsUploading(false);
                        onUploaded && onUploaded(secure_url); // Call the onUploaded callback if defined
                    } catch (error) {
                        console.error('Failed to upload', error);
                        setIsUploading(false);
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

    const onReorderToys = (sourceIndex, destinationIndex) => {
        reorderToysAction(sourceIndex, destinationIndex)
    }


    return (
        <div>
            <h1>Our Toys</h1>
            <section className="main-control-container">
                <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                <ToySort sortBy={sortBy} onSetSort={onSetSort} />
            </section>

            <main>
                <button className='btn' onClick={() => handleSaveToySwal(toyToEdit)}>{toyToEdit ? 'Edit' : 'Add Toy'} </button>
                {toys ? (
                    <ToyList toys={toys} onRemoveToy={onRemoveToy} onReorderToys={onReorderToys} />

                ) : <h1>Loading...</h1>}
                <hr />
            </main>
        </div>
    )
}