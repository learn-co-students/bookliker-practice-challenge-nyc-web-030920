document.addEventListener("DOMContentLoaded", function() {
    //books 1, 2, and 3 dont work because I patched them as objects instead of array of objects
    const infoContainer = document.querySelector('#show-panel')
    const bookUl = document.querySelector('#list')
    
    const fetchBooks = (function(){ //IIFE so I don't have to call it at the bottom
        fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => books.forEach(book => displayBookTitle(book)))
    })();

    const displayBookTitle = (book) => {
        const bookLi = document.createElement('li')
        bookLi.textContent = book.title
        bookLi.dataset.id = book.id
        bookUl.append(bookLi)
    };

    const retrieveSingleBook = (function(){ //IIFE so I don't have to call it at the bottom
        bookUl.addEventListener('click', function(event){
            let book = event.target
            fetch(`http://localhost:3000/books/${book.dataset.id}`)
            .then(response => response.json())
            .then(book => displayBook(book))
        })
    })();

    const displayBook = (book) => {
        infoContainer.innerHTML = `
        <div data-id=${book.id} class="card">
        <h2>${book.title}</h2>
        <img src=${book.img_url} class="book-image" />
        <p>${book.description}</p>
        <ul class='user-container'>
        </ul>
        <button class="read_btn">READ</button>
        </div>
        `   
        readButtonEvent()
    };

    const readButtonEvent = () => {
        const readBtn = document.querySelector('.read_btn')
        readBtn.addEventListener('click', function(event){
            let book = event.target.parentElement.dataset.id
            console.log(book)
            fetch(`http://localhost:3000/books/${book}`)
            .then(response => response.json())
            .then(bookObj => checkCurrentUsers(bookObj.users, book))
        })
    };

    const checkCurrentUsers = (users, book) => {
        console.log(users)
        const newUser = 'pouros'
        const found = users.some(el => el.username === newUser)
        // have to figure out how to send current users in patch request
        if (!found){
            addNewUser(book) //will also need to pass users as param once i figure that out
        } else {
            alert('You Have Already Read This Book!')
            users.forEach(user => displayUsers(user))
        }
    };

    const addNewUser = (book) => { //need to append users to userContainer
        fetch(`http://localhost:3000/books/${book}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                users:[
                    {'id': 1, 'username': 'pouros'}
                ]
            })
        })
        console.log('you are a new user')
    };

    const displayUsers = (user) => {
        //only test on book 4
        const userContainer = document.querySelector('.user-container')
        const userLi = document.createElement('li')
        userLi.textContent = user.username
        userContainer.append(userLi)
    };










// fetchBooks()
// retrieveSingleBook()
//end of DOMContentLoaded    
});
