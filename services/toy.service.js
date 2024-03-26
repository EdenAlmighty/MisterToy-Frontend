
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

let gToys

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    _createToys
}

_createToys()

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy =>
                regExp.test(toy.vendor) &&
                toy.price <= filterBy.maxPrice
            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: '',
        inStock: false,
    }
}

function getDefaultFilter() {
    return { name: '', price: '' }
}

function _createToys() {
    gToys = [
        _createToy(),
        _createToy(),
        _createToy()
    ]

    utilService.saveToStorage(STORAGE_KEY, gToys)
    console.log(gToys);
    return gToys
}

function _createToy() {
    return {
        _id: utilService.makeId(),
        name: utilService.makeLorem(1),
        price: utilService.getRandomIntInclusive(50, 300),
        labels: utilService.getRandomLabels(),
        createdAt: (Date.now() % 1000),
        inStock: true,
    }
}
