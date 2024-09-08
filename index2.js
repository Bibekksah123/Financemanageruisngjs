// Selecting DOM elements
const balance = document.querySelector('#balance');
const money_plus = document.querySelector('#money-plus');
const money_min = document.querySelector('#money-min');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');

// Transactions array to store transactions
const transactions = [];

// Function to add a transaction to the DOM
function trans(alltransaction) {
  const sign = alltransaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(alltransaction.amount < 0 ? 'mins' : 'plus');

  item.innerHTML = `
    ${alltransaction.text}<span>${sign}${Math.abs(alltransaction.amount)}</span>
    <button class="delbtn" onclick="remove(${alltransaction.id})">x</button>
  `;

  list.appendChild(item);
}

// Function to handle form submission
function addTrans(e) {
  e.preventDefault();

  if (text.value === '' || amount.value === '') {
    alert('Please enter the text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value, // Convert amount to a number
    };

    transactions.push(transaction);
    trans(transaction);
    updateValues();
    text.value = '';
    amount.value = '';
  }
}

// Function to generate a random ID for transactions
function generateId() {
  return Math.floor(Math.random() * 1000000); // Larger range for unique IDs
}

// Function to update the balance, income, and expense values
function updateValues() {
  const amounts = transactions.map(trs => trs.amount);
  const total = amounts.reduce((res, curr) => (res += curr), 0).toFixed(2);
  const income = amounts.filter(amt => amt > 0).reduce((res, item) => (res += item), 0).toFixed(2);
  const expenses = (amounts.filter(amt => amt < 0).reduce((res, item) => (res += item), 0) * -1).toFixed(2);

  balance.innerText = `${total}`;
  money_plus.innerText = `${income}`;
  money_min.innerText = `${expenses}`;
}

// Function to remove a transaction by ID
function remove(id) {
  const index = transactions.findIndex(transaction => transaction.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
    init();
  }
}

// Function to initialize the application
function init() {
  list.innerHTML = '';
  transactions.forEach(trans);
  updateValues();
}

// Initialize the app
init();

// Event listener for form submission
form.addEventListener("submit", addTrans);
