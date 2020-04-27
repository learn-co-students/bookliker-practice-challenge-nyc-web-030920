const userToAdd = { "id": 1, "username": "pouros" };
document.addEventListener("DOMContentLoaded", function () {
    createBookList();
});

function createBookList() {
    const bookUrl = 'http://localhost:3000/books';
    fetchBook(bookUrl)
        .then(function (books) {
            books.forEach(function (book) {
                bookLi(book);
            })
        })
}

function fetchBook(url) {
    return fetch(url)
        .then(response => response.json())
}

function bookLi(book) {
    let li = document.createElement('li')
    const bookList = document.querySelector('#list');
    li.innerText = book['title']
    li.dataset.id = book.id;
    li.style.cursor = 'pointer';
    li.addEventListener('click', function (event) {
        listenToBook(event);
    })
    bookList.append(li);
}

function listenToBook(event) {
    let eventTarget = event.target;
    const bookUrl = `http://localhost:3000/books/${eventTarget.dataset.id}`
    fetchBook(bookUrl)
        .then(function (book) {
            bookInfo(book);
        })
}

function bookInfo(book) {
    const showPanel = document.querySelector('#show-panel');
    const currListing = Array.from(showPanel.children);
    if (currListing.length) {
        currListing.forEach(function (bookList) {
            bookList.remove();
        })
    }
    let bookDiv = document.createElement('div');
    const currUsers = book['users'];
    bookDiv.dataset.id = book.id;
    bookDiv.innerHTML = `
    <h3>${book['title']}</h3>
    <img src=${book['img_url']} alt=${book['title']}>
    <p>${book['description']}</p>
    `
    let userDiv = document.createElement('div')
    bookDiv.append(userDiv);
    userDiv.id = 'users'
    currUsers.forEach(function (user) {
        let h4 = document.createElement('h4')
        h4.textContent = user['username']
        h4.dataset.userId = user.id;
        userDiv.append(h4)
    })

    let readBtn = document.createElement('button')
    readBtn.textContent = 'Read Book';
    readBtn.addEventListener('click', function(event){
        addUserToBook(event, currUsers);
    })
    bookDiv.append(readBtn);
    showPanel.append(bookDiv);
}

//add user(id = 1) to show page and update database with {"id":1, "username":"pouros"}
function addUserToBook(event, currUsers) {
    let eventTarget = event.target;
    let userList = document.querySelector('#users')
    let id = eventTarget.parentElement.dataset.id;
    //also show in current page
    let flag = isUserUniq(currUsers, userToAdd);
    if (flag) {
        //create new user within <h4>
        let h4 = document.createElement('h4');
        h4.textContent = userToAdd['username'];
        h4.dataset.userId = userToAdd['id'];
        userList.append(h4);
    } else {
        alert('You read it already!')
    }
    //when click it, make an update to database
    updateBookUser(id, currUsers);
}


//return true when user is uniq, return false if the user is not uniq
function isUserUniq(array, element) {
    let flag = true;
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === element.id) {
            flag = false;
        }
    }
    return flag;
}

function updateBookUser(id, bookUsers) {
    const bookUrl = `http://localhost:3000/books/${id}`
    //make it unique!!!
    let flag = isUserUniq(bookUsers, userToAdd);
    if (flag) {
        bookUsers.push(userToAdd);
    }
    fetch(bookUrl, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify({
            users: bookUsers
        })
    })
}