const bookForm = document.querySelector("#book-form");
const formRows = document.querySelectorAll(".form-row")
const newBookBtn = document.querySelector("#new-book");
const submitBookBtn = document.querySelector("#submit-book")
const cancelBookSubmitBtn = document.querySelector("#cancel-book-submit");
const booksPlaceholders = document.querySelectorAll(".book-placeholder");
const books = document.querySelectorAll(".book");
const bookReadIcons = document.querySelectorAll(".book-read-icon");
const removeBookIcons = document.querySelectorAll(".remove-book-icon");

let bookReadStatus = null;

newBookBtn.addEventListener("click", () => {
    if(bookForm.style.visibility === "visible") {
        bookForm.style.visibility = "hidden";
    } else {
        bookForm.style.visibility = "visible";
    }
});

submitBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    formRows.forEach(row => {
        alert(row.children[1].value)
    })
});

cancelBookSubmitBtn.addEventListener("click", () => {
    bookForm.style.visibility = "hidden";

});

bookReadIcons.forEach(icon => {
    icon.onclick = () => {
        if(icon.src.slice(-16) == "read_checked.svg") {
            icon.src = "/assets/images/read_not_checked.svg";
            icon.title = "Not read"
        } else {
            icon.src = "/assets/images/read_checked.svg";
            icon.title = "Read"
        }
    }
});

removeBookIcons.forEach(icon => {
    icon.onclick = () => {
        icon.parentElement.parentElement.remove()
        // icon < book-icons < Book
    }
});

const myLibrary = [];

function Book(name, author, pages, readStatus) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.readStatus = readStatus
}

function addBookToLibrary() {

}