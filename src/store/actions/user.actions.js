// import { socketService } from '../services/socket.service.js'

import { userService } from "../../services/user.service.js"
import { REMOVE_USER, SET_USER, SET_USERS } from "../reducers/user.reducer.js"
import { store } from "../store.js"

// export function updateUser(userToUpdate) {
//     return userService.updateUserPrefs(userToUpdate)
//         .then((updatedUser) => {
//             store.dispatch({ type: SET_USER, user: updatedUser })
//         })
// }

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } 
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        socketService.login(user)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
        socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

// export function checkout(diff) {
//     return userService.updateScore(-diff)
//         .then((newToy) => {
//             store.dispatch({ type: CLEAR_LIST })
//             store.dispatch({ type: SET_USER_TOYS, todo: newToy })
//         })
//         .catch((err) => {
//             console.log('user actions -> Cannot checkout', err)
//             throw err
//         })
// }