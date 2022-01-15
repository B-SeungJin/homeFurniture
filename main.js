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
        <img src="${item.img}" alt="${item.name}" class="item_thumbnail"/>
        <span class="item__description">${item.name}</span>
        <span class="item__description">${item.price}</span>
    <li>
    `;
}

function onButtonClick(event, items) {
    const target = event.target;
    const key = target.dataset.key;
    const value = target.dataset.value;

    if (key == null || value == null) {
        return;
    }
    updateItems(items, key, value);
}

function updateItems(items, key, value) {
    items.forEach(item => {
        if (item.dataset[key] === value) {
            item.classList.remove('invisible');
        }
        else {
            item.classList.add('invisible');
        }
    });
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