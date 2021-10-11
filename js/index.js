const buttonsContainer = document.querySelector(
  ".tip-calculator__buttons-container"
);
const tipButtons = buttonsContainer.getElementsByClassName(
  "tip-calculator__button"
);
const billInput = document.querySelector("#bill");
const personInput = document.querySelector("#persons");
const personInputContainer = document.querySelector("#persons-label");
const customTip = document.querySelector("#tip-custom");
const tipPriceDisplay = document.querySelector("#tipDisplay");
const totalPriceDisplay = document.querySelector("#totalDisplay");
const resetButton = document.querySelector("#buttonReset");

const warningMessage = document.createElement("span");
warningMessage.className = "tip-calculator__text--warning";
warningMessage.innerText = "Can't Be Zero";

billInput.addEventListener("input", () => {
  if (checkBillAndPersons()) {
    let tip = checkTip();
    if (tip) {
      updatePriceDisplay(tip);
    }
  }
});

personInput.addEventListener("input", () => {
  if (checkBillAndPersons()) {
    let tip = checkTip();
    if (tip) {
      updatePriceDisplay(tip);
    }
  }
});

buttonsContainer.addEventListener("click", (event) => {
  if (event && event.target.tagName === "BUTTON") {
    let tipButton = event.target;
    tipButtonClassHandler(tipButton);
    console.log(checkTip());
    if (checkBillAndPersons()) {
      updatePriceDisplay(tipButton);
    }
  }
});

customTip.addEventListener("click", (event) => {
  tipButtonClassHandler();
  if (customTip.value !== "") {
    if (checkBillAndPersons()) {
      updatePriceDisplay(customTip);
    }
  }
});

customTip.addEventListener("input", (event) => {
  if (checkBillAndPersons()) {
    updatePriceDisplay(customTip);
  }
});

resetButton.addEventListener("click", (event) => reset());

const tipButtonClassHandler = (button = "") => {
  [...tipButtons].forEach((otherButton) => {
    if (otherButton === button) {
      otherButton.classList.add("tip-calculator__button--checked");
      customTip.value = "";
    } else {
      otherButton.classList.remove("tip-calculator__button--checked");
    }
  });
};

const checkBillAndPersons = () => {
  if (billInput.value === "" || personInput.value === "") {
    return false;
  } else if (checkIfZero()) {
    return false;
  } else {
    resetButton.disabled = false;
    return true;
  }
};

const checkIfZero = () => {
  if (personInput.value === "0") {
    personInputContainer.appendChild(warningMessage);
    personInput.classList.add("tip-calculator__input--warning");
    return true;
  } else {
    if (personInputContainer.contains(warningMessage)) {
      personInputContainer.removeChild(warningMessage);
      personInput.classList.remove("tip-calculator__input--warning");
    }
    return false;
  }
};

const checkTip = () => {
  let buttons = [...tipButtons];
  let tip = buttons.find((button) =>
    button.classList.contains("tip-calculator__button--checked")
  );
  if (tip) {
    return tip;
  } else if (customTip.value !== "") {
    return customTip;
  } else {
    return false;
  }
};

const updateTipPriceDisplay = (tip) => {
  let tipValue = calculateTip(tip);
  let persons = Number(personInput.value);
  let tipPricePeerPerson = tipValue / persons;
  tipPriceDisplay.innerText = tipPricePeerPerson.toFixed(2);
};

const updateTotalPriceDisplay = (tip) => {
  let tipValue = calculateTip(tip);
  let bill = Number(billInput.value);
  let persons = Number(personInput.value);
  let totalValue = bill + tipValue;
  let totalPerrPerson = totalValue / persons;
  totalPriceDisplay.innerText = totalPerrPerson.toFixed(2);
};

const updatePriceDisplay = (tip) => {
  updateTipPriceDisplay(tip);
  updateTotalPriceDisplay(tip);
};

const calculateTip = (tip) => {
  let tipPercentage = Number(tip.value);
  tipPercentage > 1 ? (tipPercentage /= 100) : (tipPercentage = tipPercentage);
  let bill = Number(billInput.value);
  let tipPrice = bill * tipPercentage;
  return tipPrice;
};

const reset = () => {
  billInput.value = "";
  personInput.value = "";
  customTip.value = "";
  tipButtonClassHandler();
  resetButton.disabled = true;
  tipPriceDisplay.innerText = "0.00";
  totalPriceDisplay.innerText = "0.00";
};
