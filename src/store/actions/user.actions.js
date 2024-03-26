
import { CLEAR_LIST, SET_USER, SET_USER_TOYS } from "../reducers/user.reducer.js"
import { userService } from "../../services/user.service.js"
import { store } from "../store.js"

export function updateUser(userToUpdate) {
    return userService.updateUserPrefs(userToUpdate)
        .then((updatedUser) => {
            store.dispatch({ type: SET_USER, user: updatedUser })
        })
}

export function login(credentials) {
    return userService.login(credentials)
        .then((user) => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch((err) => {
            console.log('user actions -> Cannot login', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then((user) => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch((err) => {
            console.log('user actions -> Cannot signup', err)
            throw err
        })
}

export function logout(credentials) {
    return userService.logout(credentials)
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch((err) => {
            console.log('user actions -> Cannot logout', err)
        })
}

export function checkout(diff) {
    return userService.updateScore(-diff)
        .then((newToy) => {
            store.dispatch({ type: CLEAR_LIST })
            store.dispatch({ type: SET_USER_TOYS, todo: newToy })
        })
        .catch((err) => {
            console.log('user actions -> Cannot checkout', err)
            throw err
        })
}