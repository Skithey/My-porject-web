'use strict'

const KEY = 'books';
var gBooks;
var gTitles = ['Mobi Dick', 'Harry Potter', 'Puki in the neighborhood', 'Muki and the function'];



function createBook(title, price = getRandomIntInclusive(8,30)) {

    var book = {
        id: +makeId(),
        title: title,
        price: price,
        desc: makeLorem()
    }
    return book;
}

function getTitles() {
    return gTitles
}

function getBooks() {
    return gBooks
}

function createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        console.log('hey')
        books = []
        for (var i = 0; i < 3; i++) {
            var title = gTitles[getRandomIntInclusive(0, gTitles.length - 1)]
            books.push(createBook(title))
        }
    }
    gBooks = books;
    // console.log(books)
    saveBooksToStorage();
}


function removeBook(bookId) {
    console.log(bookId)
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    saveBooksToStorage();
}


function addBook(title, price) {
    var book = createBook(title, price)
    gBooks.unshift(book)
    saveBooksToStorage();
}

function saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}


function updateBook(bookPrice, bookId) {
    gBooks[bookId - 1].price = bookPrice

    saveBooksToStorage()
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}