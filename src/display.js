import Book from './book';
import Library from './library';

const NEW_BOOK_BTN = document.querySelector('.new-book-btn');
const CANCEL_BTN = document.querySelector('.cancel');
const FORM_CONTAINER = document.getElementById('form-container');
const FORM = document.querySelector('form');
const INPUTS = FORM.querySelectorAll('input');
const BOOK_DISPLAY = document.querySelector('.book-display');
const ERROR_MESSAGE = document.getElementById('errorMsg');

const library = new Library();

// Storage
const saveLocal = () => {
  localStorage.setItem('library', JSON.stringify(library.books))
}

// Focus first input
function focusFirstInput() {
  const firstInput = FORM.querySelector('input');
  firstInput.focus();
}

// Hide/reset form
function hideForm() {
  FORM_CONTAINER.classList.toggle('hide-display');
  FORM.reset();
  focusFirstInput();
}

const createBookCard = (book) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('card', 'my-5');
  bookCard.innerHTML = `<div class="card-header">Title: ${book.title}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Author: ${book.author}</li>
      <li class="list-group-item">Pages: ${book.pages}</li>
      <li class="list-group-item">Read: ${book.isRead ? 'Yes' : 'No'}</li>
    </ul>
    <div class="card-footer text-center">
      <button type="button" class="btn toggle-read-btn">${book.isRead ? 'Mark as unread' : 'Mark as read'}</button>
      <button type="button" class="btn delete-btn">Remove</button>
    </div>`;
  BOOK_DISPLAY.appendChild(bookCard);

  const toggleReadButton = bookCard.querySelector('.toggle-read-btn');
  toggleReadButton.addEventListener('click', () => {
    book.toggleRead();
    saveLocal();
    updateBooksDisplay();
  });

  const deleteButton = bookCard.querySelector('.delete-btn');
  deleteButton.addEventListener('click', () => {
    library.removeBook(book.title);
    saveLocal();
    updateBooksDisplay();
  });
};

function updateBooksDisplay() {
  BOOK_DISPLAY.innerHTML = '';
  library.books.forEach((book) => {
    createBookCard(book);
  });
}

function getBookFromInput() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;
  return new Book(title, author, pages, isRead);
}

function addBook(e) {
  e.preventDefault();
  const newBook = getBookFromInput();

  if (library.isInLibrary(newBook)) {
    ERROR_MESSAGE.textContent = 'This book is already in your library';
    ERROR_MESSAGE.classList.toggle('hide-display');
    FORM.reset();
    return;
  } else {
    library.addBook(newBook);
    saveLocal();
    ERROR_MESSAGE.classList.toggle('hide-display');
    updateBooksDisplay();
    hideForm();
  }
}

export default function init() {
  const localData = localStorage.getItem('library')
  if (localData) {
    library.books = JSON.parse(localData).map((bookData) => new Book(bookData.title, bookData.author, bookData.pages, bookData.isRead));
    updateBooksDisplay();
  }

  FORM.addEventListener('submit', addBook);
  NEW_BOOK_BTN.addEventListener('click', hideForm);
  CANCEL_BTN.addEventListener('click', hideForm);
  INPUTS.forEach((input) => input.setAttribute('autocomplete', 'off'));
}
