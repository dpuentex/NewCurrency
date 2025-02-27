const appContainer = document.querySelector(".app");
const loginUsernameInput = document.querySelector(".usernameInput");
const loginPinInput = document.querySelector(".pinInput");
const btnLogin = document.querySelector(".btnLogin");
const welcomeLabel = document.querySelector(".welcome-str");
const labelBalanceValue = document.querySelector(".balance_value");
const containerMovements = document.querySelector(".movements");

const app = document.querySelector(".app");
//Transfers
const transferTo = document.querySelector(".form_input--to");
const transferAmountInput = document.querySelector(".form_input--amount");
const btnTransfer = document.querySelector(".form_btn--transfer");
//Loan
const loanAmount = document.querySelector(".form_input--loan-amount");
const btnLoan = document.querySelector(".form_btn--loan");
// Close Account
const closeUsernameInput = document.querySelector(".form_input--user");
const closePinInput = document.querySelector(".form_input--pin");
const btnClose = document.querySelector(".form_btn--close");
//Summary and sort
const summaryValueIn = document.querySelector(".summary_value-in");
const summaryValueOut = document.querySelector(".summary_value-out");
const summaryValueInterest = document.querySelector(".summary_value-interest");
const btnSort = document.querySelector(".btn-sort");

const accounts = JSON.parse(localStorage.getItem("bankAccounts")) || [
  {
    firstName: "Diego",
    lastName: "Puente",
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    username: "dpuente",
    pin: Number(1000),
    balance: [
      3000, 1000, -200, 230, -340, 600, 200, 500, 4000, -1300, 6430, -2321, 533,
      -250,
    ],
    creditScore: Number(750),
    interestRate: 2,
  },
  {
    firstName: "Dylan",
    lastName: "Langsland",
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    username: "dlangs",
    pin: Number(2000),
    balance: [1000, 300, -400, 230, -500, 600],
    creditScore: Number(650),
    interestRate: 5,
  },
];

const updateUI = function (acc) {
  displayMovements(currentAccount.balance);
  displayBalance(acc);
  calcDisplaySummary(acc);
};

const displayBalance = function (accounts) {
  const balance = accounts.balance.reduce((acc, mov) => acc + mov);
  labelBalanceValue.textContent = `$${balance}`;
};

const displayMovements = function (movements) {
  containerMovements.textContent = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      
          <div class="movements__value">$${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  // const accounts = JSON.parse(localStorage.getItem("bankAccounts")) || [];
  currentAccount = accounts.find(
    (acc) => acc.username === loginUsernameInput.value
  );
  console.log("Attemted login with:", loginUsernameInput.value);
  console.log("Current Accounts:", accounts);
  console.log("Found Account:", currentAccount);

  if (currentAccount?.pin === Number(loginPinInput.value)) {
    welcomeLabel.textContent = `Welcome back ${currentAccount.firstName}`;
    appContainer.style.opacity = 100;

    app.classList.remove("app-hidden");
    updateUI(currentAccount);
  } else {
    console.log("Login Failed: Incorrect username or pin");
    welcomeLabel.textContent = `Please use correct username and password`;
  }
});

const calcDisplaySummary = function (accounts) {
  const balanceIn = accounts.balance
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  summaryValueIn.textContent = balanceIn;

  const balanceOut = accounts.balance
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryValueOut.textContent = balanceOut;

  const totalBalance = accounts.balance.reduce((acc, mov) => acc + mov, 0);
  const interest = (totalBalance * accounts.interestRate) / 100;

  summaryValueInterest.textContent = interest.toFixed(2);
};

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(transferAmountInput.value);
  const reciverAcc = accounts.find((acc) => acc.username === transferTo.value);
  transferTo.value = transferAmountInput.value = "";

  const currentBalance = currentAccount.balance.reduce(
    (acc, mov) => acc + mov,
    0
  );

  if (
    amount > 0 &&
    reciverAcc &&
    currentBalance >= amount &&
    reciverAcc?.username !== currentAccount.username
  ) {
    currentAccount.balance.push(-amount);
    reciverAcc.balance.push(amount);
    console.log("Transfer done");
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(loanAmount.value);
  if (amount > 0 && currentAccount.balance.some((mov) => mov >= amount * 0.1)) {
    currentAccount.balance.push(amount);
    updateUI(currentAccount);
  }
});
//Close Acc button

//

//Hover off account movement

containerMovements.addEventListener("mouseover", function (e) {
  const movementType = e.target.closest(
    ".movements__type--withdrawal, .movements__type--deposit"
  );

  if (!movementType) return;

  const movementRow = movementType.closest(".movements__row");
  if (!movementRow) return;

  const movementValue = movementRow.querySelector(".movements__value");
  if (!movementValue) return;

  document.querySelectorAll(".movements__value").forEach((el) => {
    el.classList.remove("pop-out", "withdrawal-bg", "deposit-bg");
  });

  if (movementType.classList.contains("movements__type--withdrawal")) {
    movementValue.classList.add("withdrawal-bg");
  } else if (movementType.classList.contains("movements__type--deposit")) {
    movementValue.classList.add("deposit-bg");
  }
  movementValue.classList.add("pop-out");
});

containerMovements.addEventListener("mouseout", function (e) {
  const movementRow = e.target.closest(".movements__row");
  if (!movementRow) return;

  const movementValue = movementRow.querySelector(".movements__value");
  if (!movementValue) return;

  movementValue.classList.remove("pop-out", "withdrawal-bg", "deposit-bg");
});
