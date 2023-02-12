const formSection = document.getElementById("form-section"); // for success (add success section)
// submit
const form = document.querySelector("form");
const submitBtn = document.querySelector('button[type="submit"]');
// errors
const cvcErrorText = document.querySelector("#cvc + span.error");
const numberErrorText = document.querySelector(
  "#card-number-input + span.error"
);
const nameErrorText = document.querySelector("#card-name-input + span.error");
const dateErrorText = document.querySelector(".card-date > span.error");

// regExpressions (used as pattern in html inputs)
// const onlyLetters = /^[a-zA-Z .]+$/ig;
// const onlyNumbers = /^\d+$/g;

// front card
const cardName = document.querySelector(".name");
const cardNumber = document.querySelector(".frontcard-info__number");
const cardDateMonth = document.querySelector(".date-month");
const cardDateYear = document.querySelector(".date-year");
// front card inputs
const cardNameInput = document.getElementById("card-name-input");
const cardNumberInput = document.getElementById("card-number-input");
const cardDateMonthInput = document.getElementById("mm");
const cardDateYearInput = document.getElementById("yy");
// back card
const cvc = document.querySelector(".back-card-div__cvc");
const cvcInput = document.getElementById("cvc");

// form validation
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (isValidForm()) {
    formSection.removeChild(form); // self-destrucion LOL!
    formSection.appendChild(createSuccessDom());
  } else {
    showFormErrors();
  }
});

// front card text events
cardNameInput.addEventListener("input", (e) => {
  const text = e.target.value;
  console.log(cardNameInput.validity);
  isValid(cardNameInput, nameErrorText, "text");

  cardName.textContent = text.toUpperCase();
});

cardNumberInput.addEventListener("input", (e) => {
  cardNumber.textContent = e.target.value;
  isValid(cardNumberInput, numberErrorText, "number");
});

cardDateMonthInput.addEventListener("input", (e) => {
  cardDateMonth.textContent = e.target.value;
  isValid(cardDateMonthInput, dateErrorText, "date");
});

cardDateYearInput.addEventListener("input", (e) => {
  cardDateYear.textContent = e.target.value;
  isValid(cardDateYearInput, dateErrorText, "number");
});
// back card events
cvcInput.addEventListener("input", (e) => {
  cvc.textContent = e.target.value;
  isValid(cvcInput, cvcErrorText, "cvc");
});

// validation
const isValidForm = () => { // check if every input is valid
  if (
    cardNameInput.validity.valid &&
    cardNumberInput.validity.valid &&
    cardDateMonthInput.validity.valid &&
    cardDateYearInput.validity.valid &&
    cvcInput.validity.valid
  ) {
    return true;
  } else {
    return false;
  }
};
const isValid = (input, error, type) => {                       // for individuals inputs
                                                                // if empty, is still valid
  if (input.validity.valid || input.validity.valueMissing) {    // (that's form validation works)

    input.className = "valid"; 

    error.textContent = "";
    error.className = "error";
  } else {
    input.className = "invalid";

    showError(input, error, type);
  }
};

const showError = (input, error, type) => { //check error when typing on inputs
  // if (input.validity.valueMissing) {
  //     error.textContent = "Can´t be blank";
  // }

  if (input.validity.patternMismatch && type === "text") {
    // if (input.validity.valueMissing) {
    //     error.textContent = "Can´t be blank";
    // }
    error.textContent =
      "Wrong format, alphabet (a-z) and ('space', '.') characters only.";
  }

  // else if (!input.validity.valid && type === "number") {
  //     error.textContent = "Wrong format, numbers only.";
  // }
  else if (type === "date") {
    if (input.validity.patternMismatch) {
      error.textContent = "Please select a valid month (1-12), numbers only.";
    } else if (!input.validity.valid) {
      error.textContent = "Wrong format, numbers only.";
    }
  } else if (type === "cvc") {
    if (input.validity.tooShort) {
      error.textContent = "Please fill with 3 numers (e.g. 111)";
    } else if (!input.validity.valid) {
      error.textContent = "Wrong format, numbers only.";
    }
  }

  error.className = "error active";
};

const showFormErrors = () => { //check errors when submit
  const blankError = "Can't be blank";
  const errorClass = "invalid";

  if (!cardNameInput.validity.valid) {
    nameErrorText.textContent = blankError;
    cardNameInput.className = errorClass;
  }
  if (!cardNumberInput.validity.valid) {
    if (cardNumberInput.validity.valueMissing) {
      numberErrorText.textContent = blankError;
      cardNumberInput.className = errorClass;
    } else if (cardNumberInput.validity.patternMismatch) {
      numberErrorText.textContent =
        "Please use the correct format (e.g. 0000 0000 0000 0000)";
    }
  }
  if (!cardDateMonthInput.validity.valid) {
    dateErrorText.textContent = blankError;
    cardDateMonthInput.className = errorClass;
  }
  if (!cardDateYearInput.validity.valid) {
    dateErrorText.textContent = blankError;
    cardDateYearInput.className = errorClass;
  }
  if (!cvcInput.validity.valid) {
    cvcErrorText.textContent = blankError;
    cvcInput.className = errorClass;
  }
};

// success section
const createSuccessDom = () => {
  // create html elements
  const divMain = document.createElement("div");
  const divImg = document.createElement("div");
  const img = document.createElement("img");
  const textMain = document.createElement("h2");
  const text = document.createElement("p");
  const button = document.createElement("button");

  // add Classes
  divMain.classList.add("success");

  // add content
  img.setAttribute("src", "./images/icon-complete.svg");
  img.setAttribute("alt", "success icon");

  textMain.textContent = "THANK YOU!";
  text.textContent = "We've added your card details";
  button.textContent = "continue";

  // append
  divImg.appendChild(img);
  divMain.appendChild(divImg);
  divMain.appendChild(textMain);
  divMain.appendChild(text);
  divMain.appendChild(button);

  // button behaiviour
  button.addEventListener("click", () => {
    location.reload(); // reload the page
  });

  return divMain;
};
