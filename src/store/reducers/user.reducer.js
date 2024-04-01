import { userService } from "../../services/user.service"
export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'


const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    users: [],
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_SCORE:
            newState = { ...state, loggedInUser: { ...state.loggedInUser, score: action.score } }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        default:
            return state
    }
}