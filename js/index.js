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
            <h4>Book Description:</h4>
            <p>${book.description}</p>
            <h4>Book Fan's</h4>
            <ul class='user-container'>
            </ul>
            <button class="read_btn">READ</button>
        </div>
        ` 
        book.users.forEach(user => {
            const userContainer = document.querySelector('.user-container')
            const userLi = document.createElement('li')
            userLi.textContent = user.username
            userContainer.append(userLi) 
        }) 
        readButtonEvent()
    };

    const readButtonEvent = () => {
        const readBtn = document.querySelector('.read_btn')
        readBtn.addEventListener('click', function(event){
            let book = event.target.parentElement.dataset.id
            fetch(`http://localhost:3000/books/${book}`)
            .then(response => response.json())
            .then(bookObj => checkCurrentUsers(bookObj.users, book))
        })
    };

    const checkCurrentUsers = (users, book) => {
        const newUser = 'pouros'
        const found = users.some(el => el.username === newUser)
        if (!found){
            addNewUser(users, book) 
        } else {
            alert('You Have Already Read This Book!')
        }
    };

    const addNewUser = (users, book) => { 
        let usersArray = users.push({id:1, username:'pouros'})
        console.log(usersArray)
        console.log(users)
        const usersContainer = document.querySelector('.user-container')
        const newUserLi = document.createElement('li')
        newUserLi.textContent = 'pouros'
        usersContainer.append(newUserLi)
        fetch(`http://localhost:3000/books/${book}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({users})
        })
    };   
});
