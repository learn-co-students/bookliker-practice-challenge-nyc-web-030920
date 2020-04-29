let booksUrl = `http://localhost:3000/books`
let usersUrl = `http://localhost:3000/users`
let listOfBooks = document.getElementById('list')
let showDiv = document.getElementById('show-panel')

document.addEventListener("DOMContentLoaded", function () {
    // I M P O R T  B O O K S
    fetch(booksUrl)
        .then(resp => resp.json())
        .then(array => array.forEach(hash => {
            booksToDom(hash)
        }))
});
// I M P O R T  L O G I C 
function booksToDom(hash) {
    let li = document.createElement('li')
    li.innerText = hash.title
    listOfBooks.appendChild(li)

    li.addEventListener('click', event => {
        let bookName = event.target // li node
        showPanel()
    })
    // S H O W  P A N E L  L O G I C 
    function showPanel() {

        showDiv.innerHTML = ''
        // N A M E 
        let name = document.createElement('h1')
        name.innerText = hash.title
        showDiv.appendChild(name)
        name.dataset.id = hash.id
        // I M A G E 
        let image = document.createElement('img')
        image.src = hash.img_url
        showDiv.appendChild(image)
        //D E S C R I P T I O N
        let description = document.createElement('div')
        description.innerText = hash.description
        showDiv.appendChild(description)

        // U S E R S  L I S T 
        let usersArray = hash.users
        let userList = document.createElement('ul')
        let userClass = document.createAttribute('id')
        userClass.value = 'users-list'
        showDiv.appendChild(userList)

        // userList.forEach(userLi => {
        //     if(userLi.dataset.id === 1){

        //     }else

        // })

        usersArray.forEach(userHash => {
            // U S E R S 
            let name = userHash.username
            let id = userHash.id

            let nameLi = document.createElement('li')
            nameLi.dataset.id = id // ACCESIBLE THROUGH LI NODE
            nameLi.innerText = name
            userList.appendChild(nameLi)
        })
        // B U T T O N 
        let readButton = document.createElement('button')
        readButton.innerText = "Read Book"
        showDiv.appendChild(readButton)

        // B U T T O N  L O G I C 
        readButton.addEventListener('click', event => {
            let button = event.target
            let parent = button.parentNode
            let userList = parent.querySelectorAll('li') // [name,name,name]
            let users = Array.from(userList)

            let newArray = users.filter(obj => {
                return obj.dataset.id == 1
            })

            if (newArray.length > 0) {
                alert("left on read")
            } else {
                let nameLi = document.createElement('li')
                nameLi.dataset.id = 1
                nameLi.innerText = "pouros"
                button.previousElementSibling.appendChild(nameLi)
                let bookId = button.parentNode.firstChild.dataset.id

                let currentLi = parent.querySelectorAll('li')
                function duncanIdea(array) {
                    array.forEach(element => {
                        let userObj = `{"id":${element.dataset.id}, "username":"${element.innerText}"}`
                        console.log(userObj)
                    })
                }
                
                fetch(`${booksUrl}/${bookId}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        "users": [
                        duncanIdea(currentLi)
                    ]
                    })
                })
            }

            // userList.includes("pouros" => {
            //     if (obj.dataset.id == 1) {
            //         alert("Left on Read")
            //     } else {
            //         let nameLi = document.createElement('li')
            //         nameLi.dataset.id = 1 // ACCESIBLE THROUGH LI NODE
            //         nameLi.innerText = "pouros"
            //         button.previousElementSibling.appendChild(nameLi)
            //     }
            // })
        })
    }
}
