// import React from 'react'
// import Swal from 'sweetalert2'

// export function SwalLogin({ onConfirm, title, text, confirmButtonText, onLogin, setCredentials, isSignup }) {

//     const showSwal = () => {
//         const htmlContent = isSignup ? `
//         <input type="text" id="swal-fullname" class="swal2-input" placeholder="Full Name">
//         <input type="text" id="swal-username" class="swal2-input" placeholder="Username">
//         <input type="password" id="swal-password" class="swal2-input" placeholder="Password">`
//             :
//             `<input type="text" id="swal-username" class="swal2-input" placeholder="Username">
//          <input type="password" id="swal-password" class="swal2-input" placeholder="Password">`

//         Swal.fire({
//             title: isSignup ? 'Signup Form' : 'Login Form',
//             html: htmlContent,
//             confirmButtonText: isSignup ? 'Sign up' : 'Sign in',
//             focusConfirm: false,
//             preConfirm: () => {
//                 const username = Swal.getPopup().querySelector('#swal-username').value
//                 const password = Swal.getPopup().querySelector('#swal-password').value
//                 const fullname = isSignup ? Swal.getPopup().querySelector('#swal-fullname').value : null

//                 if (!username || !password || (isSignup && !fullname)) {
//                     Swal.showValidationMessage(`Please enter all required fields`)
//                     return false
//                 }

//                 return { username, password, fullname }
//             },
//             didOpen: () => {
//                 const inputs = Swal.getPopup().querySelectorAll('.swal2-input')
//                 inputs.forEach(input => {
//                     input.addEventListener('keypress', (e) => {
//                         if (e.key === 'Enter') {
//                             Swal.clickConfirm()
//                         }
//                     })
//                 })
//             }
//         }).then((result) => {
//             if (result.isConfirmed && result.value) {
//                 setCredentials(result.value)
//                 onLogin(result.value)
//                 onConfirm(result.value)
//             }
//         })
//     }

//     return <button onClick={showSwal} type="button">
//         {isSignup ? 'Signup' : 'Login'}
//     </button>
// }
