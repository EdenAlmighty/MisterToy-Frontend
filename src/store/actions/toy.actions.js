
import { toyService } from "../../services/toy.service.js";
import { store } from "../store.js";

import { ADD_TOY, REMOVE_TOY, REORDER_TOYS, SET_FILTER_BY, SET_IS_LOADING, SET_SORT_BY, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer.js";


export function loadToys(filterBy, sort) {
    console.log('yes');
    // const filterBy = store.getState().toyModule.filterBy
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.query(filterBy, sort)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('Toy action -> Cannot remove Toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            console.log('savedToy', savedToy);
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('Toy action -> Cannot save Toy', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY, sortBy })
}

export function reorderToysAction(sourceIndex, destinationIndex) {
    return {
        type: REORDER_TOYS,
        payload: { sourceIndex, destinationIndex }
    };
}