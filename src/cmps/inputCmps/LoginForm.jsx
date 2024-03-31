import { useState } from "react"
import { userService } from "../../services/user.service.js"
import Swal from 'sweetalert2'
// import { useSwalEnterKey } from "../customHooks/useSwalEnterKey.jsx"

export function LoginForm({ onLogin, isSignup }) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    // useSwalEnterKey()


    const showLoginOrSignupSwal = () => {
        const htmlContent = isSignup ? `
            <input type="text" id="swal-fullname" class="swal2-input" placeholder="Full Name">
            <input type="text" id="swal-username" class="swal2-input" placeholder="Username">
            <input type="password" id="swal-password" class="swal2-input" placeholder="Password">`
            :
            `<input type="text" id="swal-username" class="swal2-input" placeholder="Username">
             <input type="password" id="swal-password" class="swal2-input" placeholder="Password">`

        Swal.fire({
            title: isSignup ? 'Signup Form' : 'Login Form',
            html: htmlContent,
            confirmButtonText: isSignup ? 'Sign up' : 'Sign in',
            focusConfirm: false,
            preConfirm: () => {
                const username = Swal.getPopup().querySelector('#swal-username').value
                const password = Swal.getPopup().querySelector('#swal-password').value
                const fullname = isSignup ? Swal.getPopup().querySelector('#swal-fullname').value : null

                if (!username || !password || (isSignup && !fullname)) {
                    Swal.showValidationMessage(`Please enter all required fields`)
                    return false
                }

                return { username, password, fullname }
            },
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                setCredentials(result.value)
                onLogin(result.value) 
            }
        })
        
        setTimeout(() => {
            const inputs = Swal.getPopup().querySelectorAll('.swal2-input')
            inputs.forEach(input => {
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        Swal.clickConfirm()
                    }
                })
            })
        }, 0)
    }

    return (
        <>
            <button className='btn' onClick={showLoginOrSignupSwal} type="button">
                {isSignup ? 'Signup' : 'Login'}
            </button>
        </>
    )
}


// import { useState } from "react"
// import { userService } from "../services/user.service.js"
// import Swal from 'sweetalert2'
// import { SwalLogin } from "./SwalLogin.jsx"
// // import { useSwalEnterKey } from "../customHooks/useSwalEnterKey.jsx"

// export function LoginForm({ onLogin, isSignup }) {
//     const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
//     // useSwalEnterKey()



//     return (
//         <>
//             <SwalLogin
//                 onConfirm={(values) => console.log('Form values:', values)}
//                 setCredentials ={setCredentials}
//                 onLogin={onLogin}
//                 title="Login Form"
//                 text="Please enter your credentials"
//                 confirmButtonText="Sign in"
//                 isSignup={false}
//             />
//         </>
//     )
// }
