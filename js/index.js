
// GET /fetch these books render them on the site 
//we fetched out data and run it through a creatBook function
//createBook creates a list of book titles and appends to the parent 

//"CLICK" on a specific book & see thumbnail along with description
//&& users who have liked the book
//add event listener to our createBook function for a click 
//created a showBook function that will display the books infomation
//and users that have liked it 

//Grabbing user hash from bookJSON file 
//updating user hash with user id:1
//sending PATCH request with new user hash 

document.addEventListener("DOMContentLoaded", function() {
    let bookURL = 'http://localhost:3000/books'
    let parent = document.querySelector('#list')
    let showDiv = document.querySelector('#show-panel')


    fetch(bookURL)
    .then(response => response.json())
    .then(books => books.forEach(book => {
        createBook(book)
    }))

    function createBook(book){
    let bookLi = document.createElement('li')
    bookLi.dataset.id = book.id
    bookLi.innerText = book.title
    parent.append(bookLi)
    bookLi.addEventListener('click',e => {
        // let bookName = e.target
        showBook(book)
    })
    }


    function showBook(book){
    let userList = document.createElement('ul')
    showDiv.innerHTML =
    `<h1> ${book.title}</h1>
    <img src=${book.img_url}></img>
    <p>${book.description}</p>`
    showDiv.dataset.id = book.id 
    let array = book.users
    array.forEach(userHash => {
        let id = userHash.id
        let name = userHash.username
        let li = document.createElement('li')
        li.dataset.id = id
        li.innerText = name
        userList.append(li)
        showDiv.appendChild(userList)
    })
    showDiv.appendChild(userList)
    let readButton = document.createElement('button')
    readButton.innerText = 'Read Book'
    showDiv.append(readButton)
    readButton.addEventListener('click',e => {
        let button = e.target
        let parent = button.parentNode //if error, change parent var name 
        let userList = parent.querySelectorAll('li')
        console.log(userList)
        let array = Array.from(userList)
        let newArray = array.filter(user =>{
            return user.dataset.id == 1
        })
        if(newArray.length > 0){
            alert('left on read')
        }
        else{
            let nameLi = document.createElement('li')
            nameLi.innerText = 'pouros'
            nameLi.dataset.id = 1
            button.previousElementSibling.append(nameLi)
            let currentLi = Array.from(parent.querySelectorAll('li'))
                function duncanIdea(array) {
                     array.map(element => {
                        let userObj = {"id":`${element.dataset.id}`, "username":`${element.innerText}`}
                        return userObj
                    })
                }
            fetch(`bookURL/${showDiv.dataset.id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                'accept':'application/json'
                },
            body: JSON.stringify({
                'users': [duncanIdea(currentLi)]
            }),
            
            })
            
            
    
        }//else
        
    })

    }
    
    
   



















})//DomContent

