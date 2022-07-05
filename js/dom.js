const UNFINISHED_BOOK_ID = "unfinished";
const FINISHED_BOOK_ID = "finished";
const BOOK_ITEMID = "itemId";

function makeBook(titleBook, authorBook, yearBook, isCompleted) {

    const bookTitle = document.createElement("h2");
    const title = document.createElement("span");
    title.innerText = titleBook;
    bookTitle.append(title);

    const bookAuthor = document.createElement("h5");
    const author = document.createElement("span");
    author.innerText = authorBook;
    bookAuthor.append(author);

    const bookYear = document.createElement("p");
    const year = document.createElement("span");
    year.innerText = yearBook;
    bookYear.append(year);

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner");
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const container = document.createElement("div");
    container.classList.add("px-4", "mb-3");
    container.append(textContainer);

    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeBookFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event){
        addBookToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addBook() {
    const unfinishedBook = document.getElementById(UNFINISHED_BOOK_ID);
    const finishedBook = document.getElementById(FINISHED_BOOK_ID);
    const checkFinished = document.getElementById("inputFinished");

    const bookTitle = document.getElementById("inputTitle").value;
    const bookAuthor = document.getElementById("inputAuthor").value;
    const bookYear = document.getElementById("inputYear").value;

    if(!checkFinished.checked) {
      const book = makeBook(bookTitle, bookAuthor, bookYear, false);
      const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);
      book[BOOK_ITEMID] = bookObject.id;
      books.push(bookObject);
      unfinishedBook.append(book);
    } else {
      const book = makeBook(bookTitle, bookAuthor, bookYear, true);
      const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, true);
      book[BOOK_ITEMID] = bookObject.id;
      books.push(bookObject);
      finishedBook.append(book);
    }
    updateDataToStorage();
}

function addBookToCompleted(bookElement) {
    const bookTitle = bookElement.querySelector(".inner > h2").innerText;
    const bookAuthor = bookElement.querySelector(".inner > h5").innerText;
    const bookYear = bookElement.querySelector(".inner > p").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const finishedBook = document.getElementById(FINISHED_BOOK_ID);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    finishedBook.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBookFromCompleted(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  bookElement.remove();
  updateDataToStorage();
}

function undoBookFromCompleted(bookElement /* HTMLELement */){
    const unfinishedBook = document.getElementById(UNFINISHED_BOOK_ID);
    const bookTitle = bookElement.querySelector(".inner > h2").innerText;
    const bookAuthor = bookElement.querySelector(".inner > h5").innerText;
    const bookYear = bookElement.querySelector(".inner > p").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(bookElement[BOOK_ITEMID]);
     book.isCompleted = false;
     newBook[BOOK_ITEMID] = book.id;

     unfinishedBook.append(newBook);
     bookElement.remove();

     updateDataToStorage()
}
