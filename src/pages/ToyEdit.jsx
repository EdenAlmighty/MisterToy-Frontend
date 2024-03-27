import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { saveToy } from '../store/actions/toy.actions';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toyService } from '../services/toy.service';

export function ToyEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toyId } = useParams();
    const [toyToEdit, setToyToEdit] = useState(null);

    useEffect(() => {
        if (toyId) {
            toyService.getById(toyId).then(toy => setToyToEdit(toy));
        }
    }, [toyId]);

    const handleSaveToySwal = (toy) => {
        Swal.fire({
            title: toy ? 'Edit Toy' : 'Add New Toy',
            html: `<input id="swal-name" class="swal2-input" placeholder="Name" value="${toy ? toy.name : ''}">
                   <input id="swal-price" type="number" class="swal2-input" placeholder="Price" value="${toy ? toy.price : ''}">`,
            focusConfirm: false,
            preConfirm: () => {
                const name = document.getElementById('swal-name').value;
                const price = document.getElementById('swal-price').value;
                if (!name || !price) {
                    Swal.showValidationMessage(`Please enter name and price`);
                    return false;
                }
                return { name, price };
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                const savedToy = { ...toy, ...result.value };
                dispatch(saveToy(savedToy)); // Assuming saveToy can handle both add and edit based on if toy has _id
                Swal.fire('Saved!', '', 'success').then(() => navigate('/toy'));
            }
        });
    };

    return (
        <div>
            <h1>{toyToEdit ? 'Edit' : 'Add'} Toy</h1>
            <button onClick={() => handleSaveToySwal(toyToEdit)}>{toyToEdit ? 'Edit' : 'Add'} Toy with Swal</button>
        </div>
    );
}
