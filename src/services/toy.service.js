
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const PAGE_SIZE = 3
const STORAGE_KEY = 'toyDB'

let gToys

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
}

_createToys()

function query(filterBy = { txt: '', price: 0, inStock: 'all', pageIdx: 0, labels: [] }) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.labels && filterBy.labels.length) {
                toys = toys.filter(toy =>
                    filterBy.labels.some(label => Array.isArray(toy.labels) && toy.labels.includes(label))
                    // filterBy.labels.some(label => regex.test(label))
                )
            }
            if (filterBy.inStock !== 'all') {
                toys = toys.filter((toy) => (filterBy.inStock === 'available' ? toy.inStock : !toy.inStock))
            }
            if (filterBy.pageIdx !== undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                toys = toys.slice(startIdx, PAGE_SIZE + startIdx)
            }
            return toys
        })
    // .then(toys => {
    //     if (!filterBy.txt) filterBy.txt = ''
    //     if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    //     const regExp = new RegExp(filterBy.txt, 'i')
    //     return toys.filter(toy =>
    //         regExp.test(toy.vendor) &&
    //         toy.price <= filterBy.maxPrice
    //     )
    // })
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
        toy._id = utilService.makeId()
        toy.createdAt = (Date.now() % 1000)
        toy.creator = userService.getLoggedinUser() || '',
            toy.img = `img/${utilService.getRandomIntInclusive(1, 10)}.jpg`
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        // inStock: true,
    }
}

function getDefaultFilter() {
    return { txt: '', inStock: 'all', labels: [] }
}

function _createToys() {
    gToys = [
        _createToy(),
        _createToy(),
        _createToy(),
        _createToy(),
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
        // img: `img/6.jpg`,
        img: `img/${utilService.getRandomIntInclusive(1, 10)}.jpg`,
        inStock: true,
    }
}
