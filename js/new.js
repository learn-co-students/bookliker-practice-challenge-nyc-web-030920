document.addEventListener("DOMContentLoaded", function() {
    const bookList = document.getElementById("list")
    let bookInfoDiv = document.getElementById("show-panel")
    const bookUrl = "http://localhost:3000/books/"
  
    function fetchBooks() {
      fetch(bookUrl)
        .then(res => res.json())
        .then(json => addToBookList(json))
    }
  
    function fetchBook(id) {
      fetch(bookUrl + id)
        .then(res => res.json())
        .then(json => showBookInfo(json))
    }
  
    function changeBookLikes(id, users) {
      fetch(bookUrl + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "users": users
        })
      })
        .then(res => res.json())
        .then(json => showBookInfo(json))
    }
  
    function addToBookList(books) {
      books.forEach(book => {
        const bookLiElement = document.createElement("li")
        bookLiElement.innerHTML = book.title
        bookLiElement.dataset.id = book.id
  
        bookList.appendChild(bookLiElement)
      })
    }
  
    function showBookInfo(book) {
      bookInfoDiv.innerHTML = ""
      bookInfoDiv.dataset.id = book.id
  
      const bookTitle = document.createElement("h2")
      bookTitle.innerHTML = book.title
  
      const bookDescription = document.createElement("p")
      bookDescription.innerHTML = book.description
  
      const bookImg = document.createElement("img")
      bookImg.src = book.img_url
  
      const bookUserList = document.createElement("ul")
      book.users.forEach(user => {
        let userLi = document.createElement("li")
        userLi.innerHTML = user.username
        userLi.dataset.id = user.id
  
        bookUserList.appendChild(userLi)
      })
  
      const likeButton = document.createElement("button")
      likeButton.textContent = "like"
  
      bookInfoDiv.appendChild(bookTitle)
      bookInfoDiv.appendChild(bookDescription)
      bookInfoDiv.appendChild(bookImg)
      bookInfoDiv.appendChild(bookUserList)
      bookInfoDiv.appendChild(likeButton)
    }
  
    fetchBooks()
  
    bookList.addEventListener("click", e => {
      if (e.target.dataset.id) {
        fetchBook(e.target.dataset.id)
      }
    })
  
    bookInfoDiv.addEventListener("click", e => {
      if (e.target.textContent == "like") {
        let users = []
        let bookId = e.target.parentNode.dataset.id
  
        let allLiElements = e.target.parentNode.querySelectorAll("li")
        allLiElements.forEach(userLi => {
          users.push({
            "id": userLi.dataset.id,
            "username": userLi.textContent
          })
        })
  
        if (users.find(user => user.id == 1)) {
          users = users.filter(user => user.id !== "1")
          changeBookLikes(bookId, users)
          alert('you have read that book')
        } else {
          users.push({
            "id": "1",
            "username": "pouros"
          })
          changeBookLikes(bookId, users)
        }
      }
    })
  });