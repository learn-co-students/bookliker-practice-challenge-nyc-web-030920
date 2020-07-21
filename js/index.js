const baseUrl = "http://localhost:3000/books"
const requestHeaders = {
    "accept": "application/json",
    "content-type": "application/json"
  }

document.addEventListener("DOMContentLoaded", function() {

    fetch(baseUrl)
    .then(res => res.json())
    .then(books =>  {
        books.forEach(function(book){
            addBook(book)
        })
    }) 
    
    function addBook(book) {
        const list = document.querySelector("#list")
        let li = document.createElement("li")
       
        li.dataset.number = book.id
        li.innerHTML = `<h4 class="book-title">${book.title} </h4>`
        list.append(li)
    }

  

    
    document.addEventListener("click", function(e){
        if (event.target.className === "book-title") {
            let bookId = event.target.parentNode.dataset.number
            let showPan = document.querySelector("#show-panel")

                if (showPan.children.length > 0){
                showPan.removeChild(showPan.lastElementChild)
                }
            fetch(`${baseUrl}/${bookId}`)
            .then(res => res.json())
            .then(book =>  {
                let div = document.createElement('div')
                let likers = []
                book.users.forEach(function(user){
                    likers.push(user.username)
                })
                console.log(likers)
                div.dataset.number = book.id
             
                div.innerHTML = `
                    <h1>${book.title}</h1>
                    <img src="${book.img_url}">
                    <p>${book.description}</p>
                    <p>Users who like this book:</p>
                    <p id="user-likes"> ${likers.join(", ")} </p>
                    <button id="like-button">Like this book</button>
                `
                showPan.append(div)
                console.log(div.dataset.span)
                })

            
        } // end of if statement

        else if (event.target.id === "like-button") {
            let likedBook = event.target.parentNode
            let bookId = likedBook.dataset.number

            let bookUsers = likedBook.querySelector("#user-likes").textContent
            console.log(bookUsers)

        
        }

    }) // end of listner



});

