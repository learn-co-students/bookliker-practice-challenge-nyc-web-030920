document.addEventListener("DOMContentLoaded", function() {
    
    let user1 = {"id":1, "username":"pouros"}
    const baseUrl = "http://localhost:3000/books"
    const bookList = document.getElementById('list')
    const bookDiv = document.getElementById("show-panel")

    showBookList()

    function addBook(book){
        const bookLi = document.createElement("li")
        bookLi.dataset.id = `${book.id}`
        bookLi.textContent = `${book.title}`
        return bookLi
    }
    function getBooks(){
        return fetch(baseUrl)
        .then(r => r.json())
    }

    function getSingleBook(id){
        return fetch(`${baseUrl}/${id}`)
        .then(r=> r.json())
    }

    function showBookList(){
        getBooks().then(books => {
            books.forEach(function(book){
                const bookLi = addBook(book)
                bookList.append(bookLi)
                bookLi.addEventListener("click", bookInfo)
            });
        })
    }

    function bookInfo(event){
        const bookId = event.target.dataset.id
        getSingleBook(bookId).then(book => {          
            bookDiv.innerHTML = `
            <h1>${book.title}</h1>
            <img src = "${book.img_url}"/>
            <p>${book.description}</p>
            <div class="user"></div>
            <button data-id=${book.id}>Read</button>
            `        
            const currentUsers = book.users
            currentUsers.forEach(function(user){
            let userNameDiv = document.querySelector(".user")
            let userNameh3 = document.createElement("h3")
            userNameh3.innerText = user.username 
            userNameh3.dataset.id = user.id
            userNameDiv.append(userNameh3)
           
            })
            const button = document.querySelector('button')
            button.addEventListener('click',onReadBtnclick)
        })
    }

    function onReadBtnclick(e){
        const bookId = e.target.dataset.id 
        getSingleBook(bookId).then(book=>{
            const bookDiv = e.target.parentNode
            let userdiv = bookDiv.querySelector('.user')
            let addh3 = document.createElement("h3")
            const currentUsers = book.users             
            currentUsers.push(user1)
            fetch(`${baseUrl}/${bookId}`,{
                method:"PATCH",
                headers:{"accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({ users: currentUsers })
            })             
            addh3.innerText = user1.username 
            addh3.dataset.id = user1.id
            userdiv.append(addh3)         
        })
    }    
    //need to finish the remove dupilicate 
    //- BONUS: Can you make it so a second patch request to the same book removes your user from the list of users? Can you toggle likes on and off?
})
