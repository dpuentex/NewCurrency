const firstNameInput = document.querySelector(".firstName");
const lastNameInput = document.querySelector(".lastName");
const createUsernameInput = document.querySelector(".createUsername");
const createPinInput = document.querySelector(".createPin");
const firstDepositInput = document.querySelector(".deposit");
const creditScoreInput = document.querySelector(".creditScore");
const btnMakeAcc = document.querySelector(".btnCreateAcc");
const loginUsernameInput = document.querySelector(".usernameInput");
const loginPinInput = document.querySelector(".pinInput");
const btnLogin = document.querySelector(".btnLogin");
const welcomeLabel = document.querySelector(".welcome");
const labelBalanceValue = document.querySelector(".balance_value");
const containerMovements = document.querySelector(".movements");

//Transfers
const transferTo = document.querySelector(".form_input--to");
const transferAmount = document.querySelector(".form_input--amount");
const btnTransfer = document.querySelector(".form_btn--transfer");
//Loan
const loanAmount = document.querySelector(".form_input--loan-amount");
const btnLoan = document.querySelector(".form_btn--loan");
// Close Account
const closeUsernameInput = document.querySelector(".form_input--user");
const closePinInput = document.querySelector(".form_input--pin");
const btnClose = document.querySelector(".form_btn--close");
//Sort
const btnSort = document.querySelector(".btn-sort");

// New accounts

//Creat User Function
const accounts = [
  {
    firstName: "Diego",
    lastName: "Puente",
    fullName: `${this.firstName} ${this.lastName}`,
    username: "dpuente",
    pin: Number(1000),
    balance: [3000, 1000, -200, 230, -340],
    creditScore: Number(700),
  },
  {
    firstName: "Dylan",
    lastName: "Langsland",
    fullName: `${this.firstName} ${this.lastName}`,
    username: "dlangs",
    pin: Number(2000),
    balance: [1000, 300, -400, 230, -500, 600],
    creditScore: Number(650),
  },
];
const createUser = function () {
  const newFirstName = firstNameInput.value;
  const newLastName = lastNameInput.value;
  const newUsername = createUsernameInput.value;
  const newPin = createPinInput.value;
  const firstDeposit = firstDepositInput.value;
  const currentCreditScore = creditScoreInput.value;
  const newUserAccount = {
    firstName: newFirstName,
    lastName: newLastName,
    fullName: `${newFirstName} ${newLastName}`,
    username: newUsername,
    pin: Number(newPin),
    balance: [firstDeposit],
    creditScore: currentCreditScore,
  };
  accounts.push(newUserAccount);
  console.log(accounts);
};

btnMakeAcc.addEventListener("click", function (e) {
  e.preventDefault();
  createUser();
});

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === loginUsernameInput.value
  );
  if (currentAccount?.pin === Number(loginPinInput.value)) {
    welcomeLabel.textContent = `Welcome back ${currentAccount.firstName}`;
  }
  console.log(currentAccount);
});

const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      
          <div class="movements__value">${mov}</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(accounts[0].balance);
