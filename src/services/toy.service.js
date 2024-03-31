
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
    getEmptyMsg
}

function query(filterBy, sort) {
    return httpService.get('toy', { params: { filterBy, sort } })
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

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: 'true'
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: Infinity, inStock: null, labels: [] }
}

function getDefaultSort() {
    return { name: 'name', asc: 1 }
}

function getToyLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
}


function getEmptyMsg() {
    return {
        msgs: [
            {
                txt: ''
            }
        ]
    }
}