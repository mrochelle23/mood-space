import data from './data.js';

const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');

let cart = [];

// Display mood items on the page
data.forEach(mood => {
  const newDiv = document.createElement('div');
  newDiv.className = 'item';

  // Mood image
  const img = document.createElement('img');
  img.src = mood.image;
  img.alt = mood.name;
  newDiv.appendChild(img);

  // Mood description
  const desc = document.createElement('p');
  desc.innerText = mood.desc;
  newDiv.appendChild(desc);

  // Mood price
  const price = document.createElement('p');
  price.innerText = `$${mood.price}`;
  newDiv.appendChild(price);

  // Add to Cart button
  const button = document.createElement('button');
  button.innerHTML = "Add to Cart";
  button.setAttribute('data-id', mood.id);
  newDiv.appendChild(button);

  // Append the new div to items container
  itemsContainer.appendChild(newDiv);
});

// Function to add items to the cart
function addItem(id) {
  const mood = data.find(mood => mood.id === id);
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...mood, qty: 1 });
  }

  showItems();
}

// Function to remove items from the cart
function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  showItems();
}

// Function to display cart items
function showItems() {
  const qty = cart.reduce((acc, item) => acc + item.qty, 0);
  cartQty.innerHTML = `You have ${qty} items in your cart`;

  let itemStr = '';
  cart.forEach(item => {
    itemStr += `<li>
      ${item.name} - $${item.price} x ${item.qty} = $${(item.qty * item.price).toFixed(2)}
      <button class="remove" data-id="${item.id}">Remove</button>
    </li>`;
  });

  itemList.innerHTML = itemStr;

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
  cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Event listener for adding items
itemsContainer.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = parseInt(e.target.getAttribute('data-id'));
    addItem(id);
  }
});

// Event listener for removing items
itemList.addEventListener('click', e => {
  if (e.target.classList.contains('remove')) {
    const id = parseInt(e.target.getAttribute('data-id'));
    removeItem(id);
  }
});
