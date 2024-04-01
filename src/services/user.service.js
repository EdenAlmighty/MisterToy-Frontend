import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const USER_BASE_URL = 'user/'
const AUTH_BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    remove,
    getById,
    getLoggedinUser,
    saveLocalUser,
    getEmptyCredentials,
    changeScore
}

async function getUsers() {
    try {
        return await httpService.get(USER_BASE_URL)
        // console.log(users);
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting users')
    }
}

async function remove(userId) {
    try {
        return await httpService.delete(AUTH_BASE_URL + userId)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing user')
    }
}

async function getById(userId) {
    try {
        const user = await httpService.get(USER_BASE_URL + userId)
        return user
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting user')
    }
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(AUTH_BASE_URL + 'login', { username, password })
        if (user) return _setLoggedinUser(user)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during login')
    }
}

async function signup({ username, password, fullname }) {
    const userCreds = { username, password, fullname }

    const user = await httpService.post(AUTH_BASE_URL + 'signup', userCreds)
    if (user) return _setLoggedinUser(user)
    else return Promise.reject('Invalid signup')
}



function logout() {
    return httpService.post(AUTH_BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, score: user.score, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



