document.addEventListener("DOMContentLoaded", function() {
  let bookDivs;
  let currentBookId;
  let parentDiv;

  getBooks()

  document.addEventListener('click', event => {
    if (event.target.tagName === 'H3') {
      if (currentBookId === event.target.dataset.id) {
        for(const div of showPanelDIV.children) {
          if (div.dataset.id === event.target.dataset.id) {
            toggleDiv(div)
          }
        }
      } else {
        //hides currently displayed book
        for(const div of showPanelDIV.children) {
          div.style.display = 'none'
          showDiv = false
        }

        for(const div of showPanelDIV.children) {
          if (div.dataset.id === event.target.dataset.id) {
            currentBookId = event.target.dataset.id
            toggleDiv(div)
          }
        }
      }
    }
  })

  document.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
      let users = []
      parentDiv = event.target.parentNode

      let userList = []
      parentDiv.childNodes.forEach(ele => {
        if (ele.tagName === 'H5') {
          userList.push(ele)
        }
      })

      let userOnePresent;

      userList.forEach(ele => {
        if (ele.innerText !== 'pouros') {
          userOnePresent = false
        } else {
          userOnePresent = true
        }
      })

      for(const ele of parentDiv.children) {
        if (ele.tagName === 'H5') {
          if (ele.innerText !== 'pouros') {
            users.push({id: ele.dataset.id, username: ele.innerText})
          } else {
            alert('You read this already!')
          }
        } 
      }
      
      users.unshift(userOne)

      fetch(`${endpoint}/${event.target.dataset.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({users: users})
      })
      .then(resp => resp.json())
      .then(json => {
        if (userOnePresent === false) {
        renderUserOne(json['users'][0], parentDiv, event.target)
        }
      })

    }
  })

})


function renderUserOne(userOneObj, div, button){
  let h5 = document.createElement('h5')
  h5.innerText = userOneObj.username
  h5.dataset.id = userOneObj.id

  div.insertBefore(h5, button)
}

const userOne = {
  id: 1,
  username: 'pouros'
}

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

let showDiv = false 

const endpoint = 'http://localhost:3000/books'

const listUL = document.getElementById('list')

const showPanelDIV = document.getElementById('show-panel')


function toggleDiv(div) {
  showDiv = !showDiv

  if (showDiv) {
    div.style.display = 'block'
  } else {
    div.style.display = 'none'
  }
}

function getBooks() {
  fetch(endpoint)
  .then(resp => resp.json())
  .then(json => json.forEach(renderData))
}

function renderData(bookObj) {
  let h3 = document.createElement('h3')
  h3.innerText = bookObj.title
  h3.dataset.id = bookObj.id

  listUL.append(h3)

  let div = document.createElement('div')
  div.dataset.id = bookObj.id
  div.style.display = 'none'
  
  let h1 = document.createElement('h1')
  h1.innerText = bookObj.title

  let img = document.createElement('img')
  img.src = bookObj.img_url

  let p = document.createElement('p')
  p.innerText = bookObj.description

  let button = document.createElement('button')
  button.innerText = 'Read book'
  button.dataset.id = bookObj.id

  div.append(h1, img, p)

  let users = bookObj.users.forEach(user => {
    let h5 = document.createElement('h5')
    h5.innerText = user.username
    h5.dataset.id = user.id

    div.append(h5)
  });

  div.append(button)
  showPanelDIV.append(div)
}

