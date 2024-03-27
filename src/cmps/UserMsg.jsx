import { useEffect, useState } from "react"
import { eventBusService } from "../services/event-bus.service"
import Swal from 'sweetalert2'

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            setTimeout(closeMsg, 3000)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (msg) {
            Swal.fire({
                title: msg.type,
                text: msg.txt || 'Do you want to continue',
                icon: msg.type,
                timer: 1500,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
        }
    }, [msg])

    function closeMsg() {
        setMsg(null)
    }

    return null
}
