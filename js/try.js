const url = "http://localhost:3000/books"
const user1 = {"id":1, "username":"pouros"}
let users = []
const ul = document.querySelector('#list')
document.addEventListener("DOMContentLoaded", ()=>{

    const renderBooksLi = () =>{
        getBooks()
        .then(books => books.forEach(book =>{
            const li = createBookLi(book)
            ul.append(li)
            li.addEventListener("click", showBook)
        }))
    } 

    const showBook = e =>{
        const id = e.target.dataset.id 
        getSingleBook(id)
        .then(book =>{
            const div = document.querySelector('#show-panel')
            div.className = "book-div"
            div.innerHTML= `
            <h2>${book.title}</h2>
            <img src = "${book.img_url}"/>
            <p>${book.description}</P>
            <ul class="user-list">
            </ul>
            <span>&#128151</span>
            <button class="read" data-id = ${book.id}>Want To Read</button> 
            <button class="delete" data-id = ${book.id}>Delete Me</button>
            `
            renderUsers(book)
            let btn =  document.querySelector('.read') 
            btn.addEventListener("click",addUser1)
            let delBtn = document.querySelector('.delete')
            delBtn.addEventListener("click", deleteUser1)
        }) 
    }

    const addUser1 =(e)=>{
        let btn = e.target
        toggleRead(btn)
        if (e.target.textContent === "Read"){
            const id = e.target.dataset.id
            getSingleBook(id)
            .then(book=>{
                users = book.users
                users.push(user1)
                updateUser(id, users)
            })
        }else if(e.target.textContent ==="Want To Read"){
            alert("you have read this book")
        }debugger
    }

    const renderUsers = book =>{
        const ul = document.querySelector('.user-list')   
        ul.innerHTML=''    
        book.users.forEach(user=>{
            const p = createUserP(user)
            ul.append(p)
        })
    }

    const deleteUser1 = (e)=>{    
        const id = e.target.dataset.id
        getSingleBook(id)
        .then(book=>{
            users = book.users
            let index = users.indexOf(user1)
            users.splice(index,1)
            updateUser(id, users)
        })         
    }
    
    const getBooks = () =>{
        return fetch(url)
        .then(r=> r.json())       
    }

    const getSingleBook = id =>{
        return fetch(`${url}/${id}`)
        .then(r=> r.json())      
    }

    const createBookLi = (book) => {
        const li = document.createElement('li')
        li.textContent = book.title
        li.dataset.id = book.id
        return li
    }
    
    const toggleRead = (btn) =>{
        btn.textContent === "Want To Read"? btn.textContent = "Read": btn.textContent = "Want To Read"
    }


    const updateUser = (id, users) =>{
        fetch(`${url}/${id}`,{
        method: "PATCH",
        headers:{"content-type":"application/json",
                "accept":"application/json"
                },
        body: JSON.stringify({users:users})        
    })
    .then(r=>r.json())
    .then(renderUsers)
    }

    const createUserP = (user) =>{
        const p = document.createElement('p')
        p.textContent = user.username
        p.dataset.id = user.id
        return p     
    }

    renderBooksLi()
})
    


