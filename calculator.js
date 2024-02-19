// Find DOM element and hold onto it, so we don't have to search for it
// every time we use it.
const calcForm = document.getElementById("calc-form");

/** Get form values and return as `{amount, years, rate}`.
 *
 * Example output: `{"amount": 10000, "years": 10, "rate": 4.5}`.
 *
 * */

function getFormValues() {

  let formData = {};
  const errors = {};

  //reset dom
  const monthlyPayment = document.getElementById("calc-monthly-payment");
  monthlyPayment.innerHTML = '';
  const errorMessage = document.getElementById("show-error");
  errorMessage.innerHTML = '';

  let amount = parseFloat(calcForm.elements["loan-amount"].value);
  if (amount <= 0 || isNaN(amount)) {
    errors.amount = "Invalid loan amount";
  }

  let years = parseFloat(calcForm.elements["loan-years"].value);
  if (years <= 0 || isNaN(years)) {
    errors.years = "Invalid loan duration";
  }

  let rate = parseFloat(calcForm.elements["loan-rate"].value);
  if (rate <= 0 || isNaN(rate)) {
    errors.rate = "Invalid interest rate";
  }

  if (Object.keys(errors).length > 0) {
    handleErrors(errors);
    return;
  }

  return formData = { amount, years, rate };

}

function handleErrors(errors) {
  const showErrors = document.getElementById("show-error");
  let errorMessage = '';

  for (let error of Object.values(errors)) {
    errorMessage += `${error}<br>`;
  }
  showErrors.innerHTML = errorMessage;

}


/** Calculate monthly payment and return exact amount. */

function calcMonthlyPayment(amount, years, rate) {

  rate = rate / 100;
  let numerator = amount * (rate / 12);
  let denominator = 1 - ( (1 + (rate / 12))**(-(years * 12)) );

  return (numerator / denominator);
}


/** Get form values, calculate, convert to 2-decimal places, and update UI. */

function getFormValuesAndDisplayResults() {

  const formData = getFormValues();

  if (formData) {
    const { amount, years, rate } = formData;

    let rawMonthPayment = calcMonthlyPayment(amount, years, rate);

    let formattedPayment = rawMonthPayment.toFixed(2);
    formattedPayment = parseFloat(formattedPayment); //convert to a number

    const monthlyPayment = document.getElementById("calc-monthly-payment");
    monthlyPayment.innerHTML = formattedPayment;
  }
}


/** Set initial form values and show initial results. Called at app start. */

function setInitialValues() {
  // use the default values in the provided screenshot

  calcForm.elements["loan-amount"].value = 10000;
  calcForm.elements["loan-years"].value = 10;
  calcForm.elements["loan-rate"].value = 4.5;

}


/** Start: set form defaults & display; attach form submit event listener. */

function start() {
  setInitialValues();

  calcForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    getFormValuesAndDisplayResults();
  });
}
