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
    };
};

newBookBtn.addEventListener("click", () => {
    if(bookForm.style.visibility === "visible") {
        bookForm.style.visibility = "hidden";
    } else {
        bookForm.style.visibility = "visible";
    };
});

submitBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let bookName = document.querySelector("#book-name").value;
    let input = document.querySelector("#book-name");

    if(bookName !== '') {
        addBookToLibrary();
        input.setCustomValidity("");
        bookForm.reset();
    } else {
        input.setCustomValidity("Invalid field.");
    };
});
    
cancelBookSubmitBtn.addEventListener("click", () => {
    bookForm.style.visibility = "hidden";
});

function readStatusBehavior() {
    let bookReadIcons = document.querySelectorAll(".book-read-icon");
    bookReadIcons.forEach(icon => {
        let parentPlaceholder = icon.parentElement.parentElement.parentElement.dataset.index;

        if(library[parentPlaceholder].readStatus == false) {
            icon.src = "assets/images/read_not_checked.svg";
        } else {
            icon.src = "assets/images/read_checked.svg";
        };

        icon.onclick = () => {
            if(icon.src.includes("read_checked.svg")) {
                icon.src = "assets/images/read_not_checked.svg";
            } else {
                icon.src = "assets/images/read_checked.svg";
            };
        };
    });
};

function removeBooksBehavior() {
    let removeBookIcons = document.querySelectorAll(".remove-book-icon");
    removeBookIcons.forEach(icon => {
        icon.onclick = () => {
            let parentPlaceholder = icon.parentElement.parentElement.parentElement.dataset.index;
            library.splice(parentPlaceholder, 1);
            icon.parentElement.parentElement.remove();

            organizeBooks();
            readStatusBehavior();
        };
    });
};

function addBookToLibrary() {
    if(library.length < 12) {
        let bookName = document.querySelector("#book-name").value;
        let bookAuthor = document.querySelector("#book-author").value;
        let bookPages = document.querySelector("#book-pages").value;
        let bookReadStatus = false;
        
        if(document.querySelector("#read").checked) {
            bookReadStatus = true;
        }

        let book = new Book(bookName, bookAuthor, bookPages, bookReadStatus, randomColor());
        library.push(book);

        for(let i = 0; i < library.length; i++) {
            if(library[i] === book) {
                addBookToPlaceholder(i);
                readStatusBehavior();
                removeBooksBehavior();
            };
        };
    }
};

function addBookToPlaceholder(position) {
    booksPlaceholders.forEach(placeholder => {
        if(placeholder.dataset.index == position) {
            if(!placeholder.hasChildNodes()) {
                const book = createElement('div', 'book');
                const bookStripe = createElement('div', 'book-side-stripe');
                const bookNameBg = createElement('div', 'book-title-bg');
                const bookName = createElement('p', null, library[position].name);
                const bookInfo = createElement('div', 'book-info');
                const bookAuthor = createElement('p', null, `by: ${library[position].author}`);
                const bookPages = createElement('p', null, `${library[position].pages} pp.`);
                const bookIcons = createElement('div', 'book-icons');
                const readIcon = createElement('img', 'book-read-icon');
                const removeBookIcon = createElement('img', 'remove-book-icon');
                bookStripe.style.backgroundColor = library[position].color;
                removeBookIcon.src = 'assets/images/remove.svg';

                bookIcons.appendChild(readIcon);
                bookIcons.appendChild(removeBookIcon);

                bookInfo.appendChild(bookAuthor);
                bookInfo.appendChild(bookPages);

                book.appendChild(bookStripe);
                book.appendChild(bookNameBg);
                book.appendChild(bookName);
                book.appendChild(bookInfo);
                book.appendChild(bookIcons);

                placeholder.appendChild(book);
            };
        };
    });
};

function createElement(el, cl, text) {
    // cl = class
    let element = document.createElement(`${el}`);
    if(cl !== null) {
        element.classList.add(`${cl}`);
    }
    if(text !== null) {
        element.textContent = text;
    }
    return element;
};

function randomColor() {
    const colorOptions = [
        'var(--red-strip)',
        'var(--blue-strip)',
        'var(--green-strip)',
        'var(--purple-strip)'];
    return colorOptions[(Math.floor(Math.random() * colorOptions.length))];
};

function organizeBooks() {
    booksPlaceholders.forEach(placeholder => {
        if(placeholder.hasChildNodes()) {
            placeholder.firstChild.remove();
        }
        if(!placeholder.hasChildNodes()) {
            for(let i = 0; i < library.length; i++) {
                addBookToPlaceholder(i);
                removeBooksBehavior();
            };
        };
    });
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