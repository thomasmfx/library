const bookForm = document.querySelector("#book-form");
const newBookBtn = document.querySelector("#new-book");
const submitBookBtn = document.querySelector("#submit-book");
const cancelBookSubmitBtn = document.querySelector("#cancel-book-submit");
const booksPlaceholders = document.querySelectorAll(".book-placeholder");
const library = [];
class Book {
    constructor(name, author, pages, readStatus, color) {
        this.name = name,
        this.author = author,
        this.pages = pages,
        this.readStatus = readStatus,
        this.color = color;
    }
};

newBookBtn.addEventListener("click", () => {
    if(bookForm.style.visibility === "visible") {
        bookForm.style.visibility = "hidden";
    } else {
        bookForm.style.visibility = "visible";
    }
});

submitBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let bookName = document.querySelector("#book-name").value;
    let input = document.querySelector("#book-name");

    if(bookName !== '') {
        addBookToLibrary()
        input.setCustomValidity("");
        bookForm.reset()
    } else {
        input.setCustomValidity("Invalid field.");
    }
});
    
cancelBookSubmitBtn.addEventListener("click", () => {
    bookForm.style.visibility = "hidden";
});

function readStatusBehavior() {
    let bookReadIcons = document.querySelectorAll(".book-read-icon");
    bookReadIcons.forEach(icon => {
        let parentPlaceholder = icon.parentElement.parentElement.parentElement.dataset.index;

        if(library[parentPlaceholder].readStatus == false) {
            icon.src = "assets/images/read_not_checked.svg"
            icon.title = "Not read"
        } else {
            icon.src = "assets/images/read_checked.svg"
            icon.title = "Read"
        }

        icon.onclick = () => {
            if(icon.src.includes("read_checked.svg")) {
                icon.src = "assets/images/read_not_checked.svg"
                icon.title = "Not read"
            } else {
                icon.src = "assets/images/read_checked.svg"
                icon.title = "Read"
            }
        }
    });
};

function removeBooksBehavior() {
    let removeBookIcons = document.querySelectorAll(".remove-book-icon");
    removeBookIcons.forEach(icon => {
        icon.onclick = () => {
            let parentPlaceholder = icon.parentElement.parentElement.parentElement.dataset.index;
            library.splice(parentPlaceholder, 1)
            icon.parentElement.parentElement.remove()
            organizeBooks()
        }
    });
};

function addBookToLibrary() {
    let bookName = document.querySelector("#book-name").value;
    let bookAuthor = document.querySelector("#book-author").value;
    let bookPages = document.querySelector("#book-pages").value;
    let bookReadStatus = false;
    
    if(document.querySelector("#read").checked) {
        bookReadStatus = true
    }
    
    let book = new Book(bookName, bookAuthor, bookPages, bookReadStatus, randomColor())
    library.push(book);

    for(let i = 0; i < library.length; i++) {
        if(library[i] === book) {
            addBookToPlaceholder(i);
            readStatusBehavior();
            removeBooksBehavior();
        }
    };
};

function addBookToPlaceholder(position) {
    booksPlaceholders.forEach(placeholder => {
        if(placeholder.dataset.index == position) {
            if(!placeholder.hasChildNodes()) {
                const createBook = document.createElement("div")
                createBook.classList.add('book');
                const createBookSideStripe = document.createElement("div")
                createBookSideStripe.classList.add('book-side-stripe');
                const createBookNameBg = document.createElement("div")
                createBookNameBg.classList.add('book-title-bg');
                const createBookName = document.createElement("p");
                createBookName.textContent = library[position].name;
                const createBookInfo = document.createElement("div")
                createBookInfo.classList.add('book-info');
                const createBookAuthor = document.createElement("p");
                createBookAuthor.textContent = `by: ${library[position].author}`;
                const createBookPages = document.createElement("p");
                createBookPages.textContent = `${library[position].pages} pp.`;
                const createBookIcons = document.createElement("div")
                createBookIcons.classList.add('book-icons');
                const createReadIcon = document.createElement("img")
                createReadIcon.classList.add('book-read-icon');
                createReadIcon.src = 'assets/images/read_not_checked.svg'
                const createRemoveIcon = document.createElement("img")
                createRemoveIcon.classList.add('remove-book-icon')
                createRemoveIcon.src = 'assets/images/remove.svg'

                createBookIcons.appendChild(createReadIcon);
                createBookIcons.appendChild(createRemoveIcon);

                createBookInfo.appendChild(createBookAuthor);
                createBookInfo.appendChild(createBookPages);
                

                createBookSideStripe.style.backgroundColor = library[position].color;
                createBook.appendChild(createBookSideStripe);
                createBook.appendChild(createBookNameBg);
                createBook.appendChild(createBookName)
                createBook.appendChild(createBookInfo);
                createBook.appendChild(createBookIcons);

                placeholder.appendChild(createBook)
            }
        }
    })
};

function randomColor() {
    const colorOptions = ['var(--red-strip)', 'var(--blue-strip)', 'var(--green-strip)', 'var(--purple-strip)']

    return (colorOptions[(Math.floor(Math.random() * colorOptions.length))]);
}

function organizeBooks() {
    booksPlaceholders.forEach(placeholder => {
        if(placeholder.hasChildNodes()) {
            placeholder.firstChild.remove()
        }
        if(!placeholder.hasChildNodes()) {
            for(let i = 0; i < library.length; i++) {
                addBookToPlaceholder(i)
                removeBooksBehavior()
            }
        }
    })
};


// Particles.js library
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#49111c"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#49111c",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        }
    },
    "retina_detect": true
});