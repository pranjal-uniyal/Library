const myLibrary = [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}
Book.prototype.changeReadStatus = function () {
  if (this.read === true) {
    this.read = false;
  } else {
    this.read = true;
  }
};

const form = document.querySelector(".form");
const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  if (form.style.display == "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
});

function displayBook() {
  const container = document.querySelector(".card-container");
  container.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const title = book.title;
    const author = book.author;
    const pages = book.pages;
    const read = book.read;
    const id = book.id;

    const card = document.createElement("div");
    card.classList.add("card");
    const bookTitle = document.createElement("h3");
    bookTitle.textContent = `TITLE: ${title}`;
    const bookAuthor = document.createElement("h4");
    bookAuthor.textContent = `Author: ${author}`;
    const bookPages = document.createElement("h5");
    bookPages.textContent = `Pages: ${pages}`;
    const bookRead = document.createElement("h6");

    const removeButton = document.createElement("BUTTON");
    removeButton.textContent = "remove";
    const statusButton = document.createElement("BUTTON");
    statusButton.textContent = "Change read status";
    removeButton.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      displayBook();
    });

    statusButton.addEventListener("click", () => {
      book.changeReadStatus();
      displayBook();
    });
    if (read === true) {
      bookRead.textContent = "Read";
    } else {
      bookRead.textContent = "Not Read";
    }
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookRead);
    card.appendChild(removeButton);
    card.appendChild(statusButton);
    container.appendChild(card);
  }
}

function addBookToLibrary() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  let read;
  if (document.querySelector("#read").checked) {
    read = true;
  } else {
    read = false;
  }

  const id = crypto.randomUUID();

  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
  displayBook();
}
