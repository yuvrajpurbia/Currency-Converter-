// Set the API endpoint with your API key
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// Get references to the dropdown elements
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

// Create dropdown options from the currencies array
currencies.forEach((currency) => {
  // Create a new option element
  const option = document.createElement("option");
  // Set the value and text of the option element
  option.value = currency;
  option.text = currency;
  // Add the option element to the "from" dropdown
  fromDropDown.add(option);
});

// Repeat the same thing for the "to" dropdown
currencies.forEach((currency) => {
  const option = document.createElement("option");
  option.value = currency;
  option.text = currency;
  toDropDown.add(option);
});

// Set default values for the dropdowns
fromDropDown.value = "USD";
toDropDown.value = "INR";

// Function to convert currency
let convertCurrency = () => {
  // Get references to the amount input field and selected currencies
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  // If the amount input field is not empty
  if (amount.length != 0) {
    // Fetch the exchange rates from the API
    fetch(api)
      .then((resp) => resp.json()) // Parse the JSON response
      .then((data) => {
        // Get the exchange rates for the selected currencies
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        // Calculate the converted amount
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        // Display the result
        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`;
      });
  } else {
    // Alert the user to fill in the amount
    alert("Please fill in the amount");
  }
};

// Add an event listener to the convert button to call convertCurrency on click
document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);

// Add an event listener to call convertCurrency on page load
window.addEventListener("load", convertCurrency);


//**IMPLEMENTATION STEPS **//
// Create initial HTML references and store the API URL in a variable
// Fill Currency codes in dropdown options
// When the user clicks on the convert button or when the page loads we call the ‘convertCurrency’ function
// The ‘convertCurrency’ function stores the values of both the dropdowns that the user has chosen or based on default values
// Now if the user hasn’t submitted a blank amount we make a GET request to the API URL using the ‘fetch’ method.
// The API returns current rates for each currency
// Now we convert the entered amount to another currency using the fetched rate and display it upto two decimals