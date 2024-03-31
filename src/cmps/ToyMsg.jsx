import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { loadToys } from "../store/actions/toy.actions";

export function ToyMsgs({ toyToEdit, msg, setMsg }) {
    // const [msg, setMsg] = useState(toyService.getEmptyMsg().msgs[0].txt)

    function handleChange(event) {
        setMsg(event.target.value)
    }

    useEffect(() => {
        loadToys()
    }, [setMsg])

    async function onSaveMsg() {
        try {
            await toyService.saveMsg(toyToEdit._id, { txt: msg })
            setMsg('')
            // setToyToEdit(toyToEdit)
            // onMessageSaved()
        } catch (err) {
            console.error('Failed to save message', err)
        }
    }


    return <div className="toy-msgs-container">
        <TextareaAutosize
            className="text-area"
            placeholder="Type your message here..."
            value={msg}
            onChange={handleChange}
            minRows={3}

        />

        <button className="btn" onClick={onSaveMsg}>Save message</button>
        {/* <input type="text" placeholder="Type your message here..." value={msg} onChange={handleChange} /> */}
    </div>
}   