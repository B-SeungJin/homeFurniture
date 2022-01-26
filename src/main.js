const toggleBtn = document.querySelector('.toogleBtn');
const menu = document.querySelector('.menu');
const icons = document.querySelector('.icons');

toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    icons.classList.toggle('active');
});

function loadItems() {
    return fetch('data/data.json')
       .then(responce => responce.json())
       .then(json => json.items);
}

function displayItems(items) {
    const contanier = document.querySelector('.items');
    contanier.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail"/>
        <span class="item__description">${item.name}, ${item.price}</span>
    <li>
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }

    displayItems(items.filter(item => item[key] === value));
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('button');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}



  loadItems()
  .then(items => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
