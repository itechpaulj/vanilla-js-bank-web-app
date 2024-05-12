'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
/*
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
*/
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
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

const account5 = {
  owner: "Paul Javinez",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 5555,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "PHP",
  locale: "en-PH", // de-DE
};

const accounts = [account1, account2,account5];

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


for(let [i,account] of accounts.entries()){

    let mergeOwnerFullName = account.owner.toLowerCase().split(' ');

    let createUserName = mergeOwnerFullName.map(function(username){
      return username[0];
    }).join('');

    account.userName = createUserName

    let totalBalance = account.movements.reduce(function(acc,value){
        return acc + value;
    },0);

    account.totalBalance = totalBalance;
    
}

// date1 is Today == date2 is Prev days


const passedDays = function(date1,date2){
  return Math.floor(Math.abs((date2-date1) / (1000 * 60 * 60 * 24)))
}


const formatDays = function(getDate,locale){

  const optionsDate = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    //weekday: 'long',
  
  }
  const date = new Date();
  
  //const month = `${date.getMonth() + 1}`.padStart(2,0);
  //const day =  `${date.getDate()}`.padStart(2,0);
  //const year = date.getFullYear();

  //const hour = `${date.getHours()}`.padStart(2,0)
  //const min = `${date.getMinutes()}`.padStart(2,0)

  //let formalDate = `${month}/${day}/${year}, ${hour}:${min}`;
 // labelDate.textContent = formalDate
  
  
  let formalDate = new Intl.DateTimeFormat(locale,optionsDate).format(date);
  labelDate.textContent = formalDate
  
  let daysPassed = passedDays(new Date(),getDate);
  if(daysPassed === 0) return `Today`;
  if(daysPassed === 1) return `Yesterday`;
  if(daysPassed <= 7) return `${daysPassed} days ago`;
  else

  daysPassed = `${getDate.getMonth() + 1}`.padStart(2,0) + 
     `/${getDate.getDate()}`.padStart(2,0) +
     `/${getDate.getFullYear()}`
  
  return daysPassed;
} 


const startLogoutTimer = function(){
  const tick = function(){
    let mins = String(Math.trunc(time / 60)).padStart(2,0)
    let secs = String(Math.trunc(time % 60)).padStart(2,0)
    labelTimer.textContent = `${mins}:${secs}`

    if(time === 0){
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
      clearInterval(timer)
    }

    // although reach a zero means destroy or automatic logout
    time--;
  }

    // set timer in seconds
  let time = 120; // secs
  tick();
  const timer = setInterval(tick,1000)
  return timer;
}

const displayMovements = function(acc, sorted = false){

  containerMovements.innerHTML = '';
  let movsCopy = acc.movements.slice();
 
  let movs = sorted ? movsCopy.sort(function(currentValue,nextValue){
    if(currentValue > nextValue ) return 1;
    if(currentValue < nextValue ) return -1;
    //return currentValue - nextValue
  }) : acc.movements;
  
  for(let [count,move] of movs.entries()){
      let type = move > 0 ? 'deposit' : 'withdrawal';
      let isDate = new Date(acc.movementsDates[count])
      let displayDate = formatDays(isDate,acc.locale)

      let formattedNumber = new Intl.NumberFormat(acc.locale,{
        style: 'currency',
        currency: acc.currency,
      }).format(move.toFixed(2))

      let html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${count + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
       <div class="movements__value">${formattedNumber}</div>
      </div>
      `;
      containerMovements.insertAdjacentHTML('afterbegin',html)
  }

}


const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const formatCurrency = function(locale,currency,number){

  return new Intl.NumberFormat(locale,{
    style: 'currency',
    currency: currency,
  }).format(Math.abs(number.toFixed(2)))
}


let displayBalance = function(acc){
  let totalBalance;
  totalBalance = acc.movements.reduce(function(acc,value){
    return acc + value;
  },0)


  return formatCurrency(acc.locale,currAcc.currency,totalBalance);
}

let displaySumIn = function(acc){
    let totalSumIn;
    totalSumIn = acc.movements.filter(function(sum){
      return sum > 0;
    }).reduce(function(acc,sum){
      return acc + sum;
    },0)
    return formatCurrency(acc.locale,currAcc.currency,totalSumIn)
}

let displaySumOut = function(acc){
  let totalSumOut;
  totalSumOut = acc.movements.filter(function(sum){
    return sum < 0;
  }).reduce(function(acc,sum){
    return acc + sum;
  },0)

  return formatCurrency(acc.locale,currAcc.currency,totalSumOut);
}

let displaySumInterest = function(acc){

  let totalSumInterest;

  totalSumInterest = acc.movements.filter(function(value){
    return value > 0; // get positive number
  }).map(function(value){
    return (value * acc.interestRate ) / 100; // calculate the interest
  }).filter(function(value) {
    return value >= 1; // interest greather than 1 above minimum
  }).reduce(function(acc,value){
    return acc + value // get all total value in array
  },0);
  return formatCurrency(acc.locale,currAcc.currency,totalSumInterest);
  
}


let updateUI = function(acc){

  displayMovements(acc)
  labelBalance.textContent = `${displayBalance(acc)}`
  labelSumIn.textContent = `${displaySumIn(acc)}`
  labelSumOut.textContent = `${displaySumOut(acc)}`
  labelSumInterest.textContent = `${displaySumInterest(acc)}`
}

// keep track is login account existed
let currAcc,timer;

btnLogin.addEventListener('click',function(e){
  e.preventDefault()
 
  currAcc = accounts.find(function(acc){
    return acc.userName === inputLoginUsername.value;
  })

  if(currAcc?.userName === inputLoginUsername.value && currAcc?.pin === Number(inputLoginPin.value)){
    
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    labelWelcome.textContent = `Welcome back ${currAcc.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
   
    updateUI(currAcc)
    if(timer) clearInterval(timer)
    timer = startLogoutTimer();
  }
})


btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  let loanAmount = Number(inputLoanAmount.value);
  // if any deposit amount existed in movement array should be loan atleast  10%
  let someInput = currAcc?.movements.some(function(acc){
    return acc >= loanAmount * (10 / 100);
  })

  if(loanAmount > 0 && currAcc && someInput){
    currAcc.movements.push(loanAmount)
    currAcc.movementsDates.push(new Date().toISOString())
    updateUI(currAcc)
    inputLoanAmount.value = '';
    updateUI(currAcc)
    clearInterval(timer)
    timer = startLogoutTimer();
  }

})

btnTransfer.addEventListener('click',function (e){
  e.preventDefault();
  let transferTo = inputTransferTo.value
  let transferAmount = Math.floor(inputTransferAmount.value)
  
  let recipientAccount = accounts.find(function(acc){
    return transferTo === acc.userName
  })

  if(
    transferAmount > 0 &&
    recipientAccount &&
    recipientAccount?.totalBalance >= transferAmount &&
    recipientAccount?.userName !== currAcc?.userName
    ){
      
      currAcc.movements.push(-transferAmount)
      recipientAccount.movements.push(transferAmount)

      currAcc.movementsDates.push(new Date().toISOString())
      recipientAccount.movementsDates.push(new Date().toISOString())

      updateUI(currAcc)
      inputTransferTo.value = inputTransferAmount.value = '';
    }

})


btnClose.addEventListener('click',function(e){
  e.preventDefault();
  let closeUsr = inputCloseUsername.value
  let closeUsrPin = Number(inputClosePin.value);


  if(
    currAcc?.userName === closeUsr &&
    currAcc?.pin === closeUsrPin
  ){

    let index = accounts.findIndex(function(acc){
      return currAcc?.userName === acc.userName;
    })


    accounts.splice(index,1)
    containerApp.style.opacity = 0;
    
  }
  inputCloseUsername.value = inputClosePin.value = ''
  clearInterval(timer)

})
let sorted = false;
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  console.log(currAcc)
  displayMovements(currAcc,!sorted);
  sorted = !sorted

}) 

/////////////////////////////////////////////////
