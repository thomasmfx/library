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
    addBookToLibrary()
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
    let bookName = document.querySelector("#book-name").value;
    let bookAuthor = document.querySelector("#book-author").value;
    let bookPages = document.querySelector("#book-pages").value;
    let bookIndex = null;
    
    if(document.querySelector("#radio-read").checked) {
        bookReadStatus = true
    } else {
        bookReadStatus = false
    }

    let book = new Book(bookName, bookAuthor, bookPages, bookReadStatus)
    myLibrary.push(book)
    for(let i = 0; i < myLibrary.length; i++) {
        if(myLibrary[i] === book) {
            bookIndex = i;
            // alert(myLibrary[i] = `book${i}`)
        }
    }

booksPlaceholders.forEach(placeholder => {
        if(!placeholder.hasChildNodes()) {
            const createBook = document.createElement("div")
            createBook.classList.add('book');
            const createBookSideStripe = document.createElement("div")
            createBookSideStripe.classList.add('book-side-stripe');
            const createBookNameBg = document.createElement("div")
            createBookNameBg.classList.add('book-title-bg');
            const createBookName = document.createElement("p");
            createBookName.textContent = bookName;
            const createBookInfo = document.createElement("div")
            createBookInfo.classList.add('book-info');
            const createBookAuthor = document.createElement("p");
            createBookAuthor.textContent = `by: ${bookAuthor}`;
            const createBookPages = document.createElement("p");
            createBookPages.textContent = `${bookPages} pp.`;
            const createBookIcons = document.createElement("div")
            createBookIcons.classList.add('book-icons');
            const createReadIcon = document.createElement("img")
            createReadIcon.classList.add('book-read-icon');
            createReadIcon.src = 'assets/images/read_checked.svg'
            const createRemoveIcon = document.createElement("img")
            createRemoveIcon.classList.add('remove-book-icon')
            createRemoveIcon.src = 'assets/images/remove.svg'

            createBookIcons.appendChild(createReadIcon);
            createBookIcons.appendChild(createRemoveIcon);

            createBookInfo.appendChild(createBookAuthor);
            createBookInfo.appendChild(createBookPages);
            
            createBook.appendChild(createBookSideStripe);
            createBook.appendChild(createBookNameBg);
            createBook.appendChild(createBookName)
            createBook.appendChild(createBookInfo);
            createBook.appendChild(createBookIcons);

            placeholder.appendChild(createBook)
        }
    })
}