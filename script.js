///////////////////////////////// strict mode //////////////////////////////////
'use strict';

//////////////////////////////// Toggle dark mode button //////////////////////////////////
// Add event listener to the document to handle clicks on the toggle button
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (event) {
    const toggleButton = document.getElementById('toggleButton');

    // Check if the clicked element is the toggle button
    if (event.target === toggleButton) {
      toggleDarkMode();
    }
  });
});

// Toggle light/dark mode button
function toggleDarkMode() {
  const body = document.body;
  const banner = document.getElementById('banner');
  const isDarkMode = body.classList.toggle('dark-mode');

  // Save user preference to localStorage
  localStorage.setItem('darkMode', isDarkMode);
  if (isDarkMode) {
    banner.style.backgroundColor = '#000'; // Dark mode background color
  } else {
    banner.style.backgroundColor = '#fff'; // Light mode background color
  }
}

// Check user preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    toggleDarkMode();
  }
});

///////////////////////////////// Contact form function //////////////////////////////////////////////
// Wait for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', () => {
  // Get the reference to the contact form
  const form = document.getElementById('contact-form');
  // Add an event listener to the form for the 'submit' event, calling the submitForm function
  form.addEventListener('submit', submitForm);
});

// Function to handle form submission
function submitForm(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Validate form inputs
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  // Get the selected radio button for the contact method
  const contactMethod = document.querySelector('input[name="contactMethod"]:checked');
  const comments = document.getElementById('comments').value.trim();

  // Clear previous error messages
  clearErrorMessages();

  // Validate first name
  if (!firstName) {
    showError('firstName', 'First name is required');
    return;
  }

  // Validate last name
  if (!lastName) {
    showError('lastName', 'Last name is required');
    return;
  }

  // Validate contact method
  if (!contactMethod) {
    showError('contactMethod', 'Please choose a preferred contact method');
    return;
  }

  // Validate either phone number or email based on preferred contact method
  if (contactMethod.value === 'phone' && (!phone || !phone.match(/^\d{10}$/))) {
    showError('phone', 'Please enter a valid phone number (10 digits)');
    return;
  }

  if (contactMethod.value === 'email' && (!email || !email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/))) {
    showError('email', 'Please enter a valid email address');
    return;
  }

  // Validate comments
  if (!comments) {
    showError('comments', 'Comments are required');
    return;
  }

  // If all validations pass, create a customer object
  const customer = {
    fullName: `${firstName} ${lastName}`,
    phone,
    email,
    contactMethod: contactMethod.value,
    comments,
  };

  // Display confirmation message
  displayConfirmation(customer);

  // Reset form
  document.getElementById('contact-form').reset();

  // Log success message 
  console.log('Form submitted successfully:', customer);
}

// Function to show an error message next to a form field
function showError(inputId, errorMessage) {
  const inputElement = document.getElementById(inputId);
  const errorElement = document.createElement('span');
  errorElement.className = 'error-message';
  errorElement.textContent = errorMessage;
  inputElement.parentNode.appendChild(errorElement);
}

// Function to clear all error messages
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(errorMessage => errorMessage.remove());
}

// Function to display a confirmation message
function displayConfirmation(customer) {
  const confirmationMessage = document.getElementById('confirmation-message');
  confirmationMessage.textContent = `Thank you for your submission, ${customer.fullName}! We'll contact you soon via ${customer.contactMethod}.`;
}


/////////////////////////////////// Product Display //////////////////////////////////
function showProduct(productNumber) {
  // Hide all products
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`product-name-${i}`).style.display = 'none';
    document.getElementById(`product-description-${i}`).style.display = 'none';
    document.getElementById(`product-image-${i}`).style.display = 'none';
  }

  // Show the selected product
  document.getElementById(`product-name-${productNumber}`).style.display = 'block';
  document.getElementById(`product-description-${productNumber}`).style.display = 'block';
  document.getElementById(`product-image-${productNumber}`).style.display = 'block';
}

// Add event listeners to product buttons
document.getElementById('productButton1').addEventListener('click', function () {
  showProduct(1);
});

document.getElementById('productButton2').addEventListener('click', function () {
  showProduct(2);
});

document.getElementById('productButton3').addEventListener('click', function () {
  showProduct(3);
});

//////////////////////////////////////Guessing Game/////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  // Add event listener to the "Play" button
  var playButton = document.getElementById('playButton');
  playButton.addEventListener('click', playGuessingGame);
});

function playGuessingGame() {
  // Get user's guess from the input field
  var userGuess = parseInt(document.getElementById('userGuess').value);

  // Reference to the error message element
  var errorMessageElement = document.getElementById('errorMessage');

  // Validate that the user's guess is within the range 1-10
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    // Display an error message
    errorMessageElement.textContent = 'Please enter a number between 1 and 10.';
    // Clear the result message
    document.getElementById('resultMessage').innerHTML = '';
    // Hide the instruction text
    var instructionTextElement = document.getElementById("instructionText");
    instructionTextElement.style.display = "none";
    return;
  } else {
    // Clear the error message if it was previously displayed
    errorMessageElement.textContent = '';
  }

  // Generate a random number between 1 and 10
  var randomNumber = Math.floor(Math.random() * 10) + 1;

  // Display the user's guess and the random number
  var resultMessage = `Your Guess: ${userGuess}<br>Winning Number: ${randomNumber}<br>`;

  // Compare the user's guess with the random number
  if (userGuess === randomNumber) {
    resultMessage += `Congratulations, you won a 10% off coupon!<br>Use code WINNER10 at checkout!<br><a href="https://order.grillonmain.net/menu" target="_blank">Order Online</a>`;
  } else {
    resultMessage += "Sorry, you didn't win. Try again!";
  }


  // Display the result message
  document.getElementById('resultMessage').innerHTML = resultMessage;

  // Hide the instruction text
  var instructionTextElement = document.getElementById("instructionText");
  instructionTextElement.style.display = "none";
}
