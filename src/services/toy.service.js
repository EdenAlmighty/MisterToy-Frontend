
import { httpService } from './http.service.js'

const PAGE_SIZE = 3
const STORAGE_KEY = 'toyDB'

// let gToys

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getToyLabels,
    saveMsg,
    removeMsg,
    getEmptyMsg,
    saveReview,
    removeReview,
    getEmptyReview
}

function query(filterBy, sortBy) {
    console.log('sortBy', sortBy);
    return httpService.get('toy', { params: { filterBy, sortBy } })
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function saveMsg(toyId, msg) {
    return httpService.post(`toy/${toyId}/msg`, msg)
}

function removeMsg(toyId, msgId) {
    return httpService.delete(`toy/${toyId}/msg/${msgId}`)
}
function saveReview(toyId, review) {
    return httpService.post(`toy/${toyId}/review`, review)
}

function removeReview(toyId, reviewId) {
    return httpService.delete(`toy/${toyId}/review/${reviewId}`)
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        reviews: [],
        inStock: 'true'
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: Infinity, inStock: 'all', labels: [] }
}

function getDefaultSort() {
    return { by: '', asc: 1 }
}

function getToyLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
}


function getEmptyMsg() {
    return {
        msgs: [{ txt: '' }]
    }
}
function getEmptyReview() {
    return {
        reviews: [{ txt: '', rating: 0 }]
    }
}