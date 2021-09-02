const loadSearch = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';

    if (searchText === '') {
        alert('Please type a book name to search')
    }

    // load url 
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data.docs))

}


const displaySearch = (books) => {
    console.log(books);
    const bookContainer = document.getElementById('book-container')

    bookContainer.textContent = '';
    books.forEach(book => {
        // console.log(book);
        const div = document.createElement('div')
        div.classList.add('col-md-4')
        div.innerHTML = `
            <div class="book-items p-3 border border-3 m-2">
                <img src="" alt="book-thumb">
                <h3>Book Name:- ${book.title} </h3>
                <h4>Author Name:- ${book.author_name}</h4>
                <h4>Publisher:- ${book.publisher} </h4>
                <h4>First Published:- ${book.first_publish_year} </h4>
            </div>
        `
        bookContainer.appendChild(div)
    })
}
/* const loadImage = () => {
    fetch(`https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`)
        .then(res => res.json())
        .then(data => console.log(data))
}
loadImage() */