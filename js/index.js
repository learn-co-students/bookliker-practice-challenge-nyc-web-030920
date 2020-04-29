document.addEventListener('DOMContentLoaded', function () {});

const booksURL = 'http://localhost:3000/books';
const bookList = document.body.querySelector('#list');
const showBookPanel = document.body.querySelector('#show-panel');

fetch(booksURL)
  .then((res) => res.json())
  .then((booksData) => {
    // debugger
    booksData.forEach(slapBookLiOnDom);
  });

const slapBookLiOnDom = ({ id, title }) => {
  // create an element
  const bookListItem = document.createElement('li');
  // populate the element with information from the book object
  bookListItem.innerText = title;
  bookListItem.dataset.id = id;
  // slap that element on the DOM
  bookList.appendChild(bookListItem);
};

bookList.addEventListener('click', (evt) => {
  fetchOneBook(evt.target.dataset.id);
  clearShowBookPanel()
});

const clearShowBookPanel = () => showBookPanel.innerHTML = '';

const fetchOneBook = (id) => {
  fetch(booksURL + '/' + id)
    .then((res) => res.json())
    .then(({ id, title, description, img_url, users }) => {
      // create the necessary tags
      const titleH2Tag = document.createElement('h2');
      const thumbnailImgTag = document.createElement('img');
      const descriptionPTag = document.createElement('p');
      const usersUlTag = document.createElement('ul');

      // putting the info into the tags
      titleH2Tag.innerText = title;
      thumbnailImgTag.src = img_url;
      descriptionPTag.innerText = description;
      users.forEach(({ username }) => {
        // create an li tag
        const userLi = document.createElement('li');
        // give it the user's name
        userLi.innerText = username;
        // append it to our users ul tag
        usersUlTag.appendChild(userLi);
      });

      // append tags to the "showBook" panel
      showBookPanel.appendChild(titleH2Tag);
      showBookPanel.appendChild(thumbnailImgTag);
      showBookPanel.appendChild(descriptionPTag);
      showBookPanel.appendChild(usersUlTag);
    });
};
