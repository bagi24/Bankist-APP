'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type} </div>
          <div class="movements__value"> ${mov} EUR </div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySammary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income} EUR `;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} EUR`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int);

  labelSumInterest.textContent = `${interest} EUR`;
};

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(n => {
        return n[0];
      })
      .join('');
  });
};

createUserNames(accounts);
console.log(accounts);

const updateUI = function (acc) {
  calcDisplayBalance(acc);

  calcDisplaySammary(acc);

  displayMovements(acc.movements);
};

let currentAcount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAcount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  console.log(currentAcount);

  if (currentAcount?.pin === Number(inputLoginPin.value)) {
    console.log('Log IN');
  }
  labelWelcome.textContent = `Welcame ${currentAcount.owner.split(' ')[0]}`;

  containerApp.style.opacity = 100;

  inputLoginUsername.value = inputLoginPin.value = '';

  updateUI(currentAcount);
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    reciverAcc &&
    currentAcount.balance >= amount &&
    reciverAcc?.username !== currentAcount.username
  ) {
    currentAcount.movements.push(-amount);
    reciverAcc.movements.push(amount);

    updateUI(currentAcount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAcount.movements.some(mov => mov >= amount * 0.1)) {
    currentAcount.movements.push(amount);

    updateUI(currentAcount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Delete');

  if (
    inputCloseUsername.value === currentAcount.username &&
    Number(inputClosePin.value) === currentAcount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAcount.username
    );

    console.log(index);
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('sort');

  displayMovements(currentAcount.movements, !sorted);

  sorted = !sorted;
});

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

// const eurTousd = 1.1;

//  const movementsUSD = movements.map(n => {
//   return  n * eurTousd;
// })
// console.log(movements)
// console.log(movementsUSD)

// const movementsDiscription = movements.map((n, i) = >
// ` Movement ${i+1}: You ${ n >0 ? 'deposited' : 'withdrew'} ${Math.abs(n)}`

// );

// console.log(movementsDiscription)

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log('hh', max);

console.log('includes mathod', movements.includes(-130));

console.log(
  'some mathod',
  movements.some(mov => mov === -130)
);

const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit);

const depositD = movements.every(mov => mov > 0);
console.log('Every mathod', depositD);

const deposit = mov => mov > 0;

console.log('some ', movements.some(deposit));
console.log('every ', movements.every(deposit));
console.log(' filter', movements.filter(deposit));

const arr = [[[-2, -1, 0], 1, 2], [3, 4, 5, 6], [7, 8], 9, 10];
console.log(arr.flat(2));

const overBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
console.log(overBalance);

const overBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log(overBalance2);

//Array From mathod:////////////////////////////////////////////

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    k => Number(k.textContent.replace('EUR', ''))
  );

  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];

  console.log(movementsUI2);
});
