const UNFINISHED_LIST_BOOK = "unfinished";
const FINISHED_LIST_BOOK = "finished";
const BOOK_ITEMID = "bookId";


function addBook() {
    const unfinishedBookList = document.getElementById(UNFINISHED_LIST_BOOK);
    const bookTitle = document.getElementById("inputTitle").value;
    const bookAuthor = document.getElementById("inputAuthor").value;
    const bookYear = document.getElementById("inputYear").value;
    const book = makeBook(bookTitle, bookAuthor, bookYear, false);

    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, false);

     book[BOOK_ITEMID] = bookObject.id;
     books.push(bookObject);

     unfinishedBookList.append(book);
     updateDataToStorage();
}
