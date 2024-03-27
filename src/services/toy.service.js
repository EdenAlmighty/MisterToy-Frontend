
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
    getToyLabels
}

// _createToys()

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
    return { name: 'name', asc: true }
}

function getToyLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
}

// function _createToys() {
//     gToys = [
//         _createToy(),
//         _createToy(),
//         _createToy(),
//         _createToy(),
//         _createToy(),
//         _createToy(),
//         _createToy()
//     ]
//     utilService.saveToStorage(STORAGE_KEY, gToys)
//     console.log(gToys);
//     return gToys
// }

// function _createToy() {
//     return {
//         _id: utilService.makeId(),
//         name: utilService.makeLorem(1),
//         price: utilService.getRandomIntInclusive(50, 300),
//         labels: utilService.getRandomLabels(),
//         createdAt: (Date.now() % 1000),
//         // img: `img/6.jpg`,
//         img: `img/${utilService.getRandomIntInclusive(1, 10)}.jpg`,
//         inStock: true,
//     }
// }
