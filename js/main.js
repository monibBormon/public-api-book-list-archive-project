const bookContainer = document.getElementById('book-container');
const searchFound = document.getElementById('search-found')
const errorDiv = document.getElementById('error')

const toggleSpinner = displaySpinner => {
    document.getElementById('spinner').style.display = displaySpinner;
}
// search buttton funtionality
const loadSearch = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    //error handling
    if (searchText === '') {
        alert('You have to type a book name')
        return;
    }
    // display spinner 
    toggleSpinner('block');
    bookContainer.style.display = 'none'

    loadBooks(searchText)
    // error handling 
    searchInput.value = '';
    searchFound.textContent = ''
}

// load data from api
const loadBooks = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data))
}

// display books 
const displaySearch = (books) => {
    // clear the container
    bookContainer.innerHTML = '';
    // error handle
    if (books.numFound === 0) {
        errorDiv.innerText = 'No results found!'
        toggleSpinner('none');
        return;
    }
    errorDiv.textContent = '';
    searchFound.innerHTML = `
            <p>about ${books.docs.length} results for you</p>
        `;
    books.docs.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.classList.add('column')
        div.innerHTML = `
            <div class="p-3 m-2 border border-2 rounded shadow">
                <img class="w-100 height" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="book-thumb">
                <h5 class="my-3">Book Name:- ${book.title} </h5>
                <h6>Author Name:- ${book.author_name}</h6>
                <p>Publisher:- ${book.publisher} </p>
                <h6>First Published:- ${book.first_publish_year} </h6>
            </div>
        `;
        bookContainer.appendChild(div);
        toggleSpinner('none');
        bookContainer.style.display = 'block'
    });
}
