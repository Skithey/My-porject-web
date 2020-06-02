'use strict'
function onInit() {
    createBooks()
    renderBooks()
    renderTitles()
}


function renderTitles() {
    // var titles = getTitles()
    var strHtml = ` <button onclick="onAddBook()">create new book</button> `
    document.querySelector('.create-book').innerHTML = strHtml
}


function renderBooks() {
    // console.log('in')
    var books = getBooks();
    // console.log(books)
    var strHTMLs = books.map(book => {
        console.log(book.id)
        return `
        <tr>
        <td>${book.id}</td> 
        <td>${book.title}</td> 
        <td>${book.price}</td> 
        <td>
        <button class="button read" onclick="onReadBook(${book.id})">Read</button> 
        <button class="button update" onclick="onUpdateBook(${book.id})">Update</button> 
        <button class="button delete" onclick="onRemoveBook(${book.id})">Delete</button> 
        </td>
        </tr> `
    })
    // console.log(strHTMLs);
    document.querySelector('.books-table').innerHTML = strHTMLs.join('')
}
function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks()
}

function onAddBook() {
    // var elTitle = document.querySelector('.create-book button')
    var newBook = prompt('what book do you want?')
    var newPrice = prompt('how much is it?')
    addBook(newBook, newPrice)
    renderBooks()
}

function onUpdateBook(bookId) {
    var newPrice = prompt('how much is it?')
    updateBook(newPrice, bookId)
    renderBooks()
}



function onReadBook(bookId) {
    console.log(bookId)
    var book = getBookById(bookId)
    // console.log(getBookById(bookId))
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.title
    elModal.querySelector('h6').innerText = book.price
    elModal.querySelector('p').innerText = book.desc
    elModal.hidden = false;

}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}
