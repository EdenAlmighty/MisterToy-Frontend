import { useEffect } from 'react'
import Swal from 'sweetalert2'

export function useSwalEnterKey() {
    const [state, setState] = useState()

    // keep state of something

    // handle changes

    useEffect(() => {

        const timerId = setTimeout(() => {
            const inputs = Swal.getPopup()?.querySelectorAll('.swal2-input')
            inputs.forEach(input => {
                input.removeEventListener('keypress', handleEnterKeyPress)
                input.addEventListener('keypress', handleEnterKeyPress)
            })
        }, 0)

        function handleEnterKeyPress(e) {
            if (e.key === 'Enter') {
                Swal.clickConfirm()
            }
        }

        return () => {
            clearTimeout(timerId)
            const inputs = Swal.getPopup()?.querySelectorAll('.swal2-input')
            inputs?.forEach(input => {
                input.removeEventListener('keypress', handleEnterKeyPress)
            })
        }
    }, [])

    // return [state, handleChange, isLoading, isError]

    
}

