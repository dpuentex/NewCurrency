const firstNameInput = document.querySelector(".firstNameInput");
const lastNameInput = document.querySelector(".lastNameInput");
const createUsernameInput = document.querySelector(".createUsernameInput");
const createPinInput = document.querySelector(".createPinInput");
const firstDepositInput = document.querySelector(".depositInput");
const creditScoreInput = document.querySelector(".creditScoreInput");
const btnMakeAcc = document.querySelector(".btnCreateAcc");

//Creat User Function
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

const createUser = function () {
  if (
    !firstNameInput.value ||
    !lastNameInput.value ||
    !createUsernameInput ||
    !createPinInput ||
    !firstDepositInput.value ||
    !creditScoreInput.value
  ) {
    alert("Please fill in all fields");
  }

  const newFirstName = firstNameInput.value;
  const newLastName = lastNameInput.value;
  const newUsername = createUsernameInput.value;
  const newPin = createPinInput.value;
  const firstDeposit = Number(firstDepositInput.value);
  const currentCreditScore = Number(creditScoreInput.value);

  let interestRate;
  if (currentCreditScore >= 750) {
    interestRate = 2;
  } else if (currentCreditScore >= 650) {
    interestRate = 5;
  } else if (currentCreditScore >= 500) {
    interestRate = 8;
  } else {
    interestRate = 10;
  }
  const newUserAccount = {
    firstName: newFirstName,
    lastName: newLastName,
    fullName: `${newFirstName} ${newLastName}`,
    username: newUsername,
    pin: Number(newPin),
    balance: [firstDeposit],
    creditScore: currentCreditScore,
    interestRate: interestRate,
  };

  accounts.push(newUserAccount);

  localStorage.setItem("bankAccounts", JSON.stringify(accounts));

  console.log("New Account created:", newUserAccount);
  console.log("All account:", accounts);

  window.location.href = "index.html";
};

btnMakeAcc.addEventListener("click", function (e) {
  e.preventDefault();
  createUser();
});
