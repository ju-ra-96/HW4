// Define the formErrors array at the beginning
let formErrors = [];

// Function to toggle the theme and save preference to localStorage
function toggleTheme() {
  const body = document.body;
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    body.classList.remove("dark-theme");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  }
}

// Event listener for the theme switcher button
document
  .getElementById("theme-switcher")
  .addEventListener("click", toggleTheme);

// Check for a saved theme preference in localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }

  const form = document.getElementById("myForm");
  const comments = document.getElementById("comments");

  // Length reporting for textarea
  comments.addEventListener("input", function () {
    const maxLength = comments.getAttribute("maxlength");
    const remainingChars = maxLength - comments.value.length;
    showRemainingChars(remainingChars, comments);
  });

  // Form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    formErrors = []; // Reset the errors

    // Validate each field
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        formErrors.push({ field: input.name, error: input.validationMessage });
        input.classList.add("invalid");
      } else {
        input.classList.remove("invalid");
      }
    });

    // Log errors or submit the form
    if (formErrors.length > 0) {
      console.log(formErrors);
    } else {
      form.submit();
    }
  });
});

function showRemainingChars(remaining, commentsElement) {
  const infoOutput = document.getElementById("infoOutput");
  if (remaining >= 0) {
    infoOutput.textContent = `${remaining} characters remaining.`;
    infoOutput.classList.remove("error");
    if (remaining <= 10) {
      infoOutput.classList.add("warning");
      if (remaining === 0) {
        infoOutput.classList.remove("warning");
        infoOutput.classList.add("error");
      }
    } else {
      infoOutput.classList.remove("warning");
    }
  } else {
    infoOutput.textContent = "Character limit exceeded!";
    infoOutput.classList.add("error");
  }
}

// Define validateName function
function validateName() {
  var nameInput = document.getElementById("name");
  var errorDiv = document.getElementById("nameError");

  // Clear any previous custom validity set
  nameInput.setCustomValidity("");

  // Check if the value matches the pattern
  if (!nameInput.checkValidity()) {
    // If the name is not valid according to the pattern
    const errorText = "Name must contain only letters and spaces.";
    errorDiv.textContent = errorText;
    nameInput.classList.add("invalid");

    // Add the error to the formErrors array
    formErrors.push({ field: "name", error: errorText });
  } else {
    // If the name is valid
    errorDiv.textContent = "";
    nameInput.classList.remove("invalid");

    // Remove the error from the formErrors array if it exists
    formErrors = formErrors.filter((error) => error.field !== "name");
  }

  // Update the browser's validation message display
  nameInput.reportValidity();

  // Update the hidden input field with formErrors in JSON format
  updateFormErrors();
}

// Event listener for when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("name").addEventListener("input", validateName);
  document.getElementById("email").addEventListener("input", validateEmail);
});

document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const commentsInput = document.getElementById("comments");

  // Name Validation
  nameInput.addEventListener("input", function () {
    if (!/^[A-Za-z]+$/.test(nameInput.value)) {
      nameInput.setCustomValidity(
        "Name must contain only letters from A to Z or a to z."
      );
    } else {
      nameInput.setCustomValidity("");
    }
    nameInput.reportValidity();
  });

  // Email Validation
  emailInput.addEventListener("input", function () {
    if (!emailInput.validity.valid) {
      emailInput.setCustomValidity("Please enter a valid email address.");
    } else {
      emailInput.setCustomValidity("");
    }
    emailInput.reportValidity();
  });

  // Comments Validation
  commentsInput.addEventListener("input", function () {
    const maxLength = commentsInput.getAttribute("maxlength");
    const remaining = maxLength - commentsInput.value.length;

    if (remaining < 0) {
      commentsInput.setCustomValidity("Comments exceed the maximum length.");
    } else if (commentsInput.value.trim() === "") {
      commentsInput.setCustomValidity("Please provide your comments.");
    } else {
      commentsInput.setCustomValidity("");
    }
    commentsInput.reportValidity();
  });
});

// Define validateEmail function
function validateEmail() {
  const emailInput = document.getElementById("email");
  const errorDiv = document.getElementById("emailError");
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Clear any previous custom validity set
  emailInput.setCustomValidity("");

  if (emailInput.value === "") {
    const errorText = "Email is required.";
    errorDiv.textContent = errorText;
    emailInput.classList.add("invalid");

    // Add the error to the formErrors array
    formErrors.push({ field: "email", error: errorText });
  } else if (!emailPattern.test(emailInput.value)) {
    const errorText = "Please enter a valid email address.";
    errorDiv.textContent = errorText;
    emailInput.classList.add("invalid");

    // Add the error to the formErrors array
    formErrors.push({ field: "email", error: errorText });
  } else {
    errorDiv.textContent = "";
    emailInput.classList.remove("invalid");

    // Remove the error from the formErrors array if it exists
    formErrors = formErrors.filter((error) => error.field !== "email");
  }

  // Update the browser's validation message display
  emailInput.reportValidity();

  // Update the hidden input field with formErrors in JSON format
  updateFormErrors();
}

// Attach this to the email input field
document.getElementById("email").addEventListener("input", validateEmail);

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Reset the formErrors array
  formErrors = [];

  // Validate each field
  const inputs = this.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      // Push the error to the formErrors array
      formErrors.push({ field: input.name, error: input.validationMessage });
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  });

  // JSON-encode the formErrors array
  const formErrorsJSON = JSON.stringify(formErrors);

  // Update the hidden input field with the JSON-encoded errors
  document.getElementById("form-errors").value = formErrorsJSON;

  // Log errors or submit the form
  if (formErrors.length > 0) {
    console.log(formErrors);
  } else {
    // Submit the form
    this.submit();
  }
});

function updateFormErrors() {
  const formErrorsInput = document.getElementById("form-errors");
  formErrorsInput.value = JSON.stringify(formErrors);
}

// Event listener for when the DOM is fully loaded
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("name").addEventListener("input", validateName);
  document.getElementById("email").addEventListener("input", validateEmail);
  // Add event listeners for other form fields here
});

// Other validation functions for additional form fields go here

// Submit the form
document.getElementById("myForm").addEventListener("submit", function (event) {
  // Prevent the form from submitting if there are errors
  if (formErrors.length > 0) {
    event.preventDefault();
  }
});

// Function to validate the form and capture errors
function validateForm() {
  // Get form elements
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const commentsInput = document.getElementById("comments");

  // Initialize an array to capture form errors
  const formErrors = [];

  // Function to add an error to the formErrors array
  function addError(field, message) {
    formErrors.push({ field, message });
  }

  // Validate name
  if (!nameInput.validity.valid) {
    addError("name", "Please enter a valid name.");
  }

  // Validate email
  if (!emailInput.validity.valid) {
    addError("email", "Please enter a valid email address.");
  }

  // Validate comments (optional)
  if (commentsInput.value.length > 200) {
    addError("comments", "Comments should not exceed 200 characters.");
  }

  // Convert formErrors array to JSON
  const formErrorsJSON = JSON.stringify(formErrors);

  // Update the "form-errors" hidden input with the JSON data
  const formErrorsInput = document.getElementById("form-errors-input");
  formErrorsInput.value = formErrorsJSON;
}

// Attach the validateForm function to a button click event
document.getElementById("validateButton").addEventListener("click", function () {
  validateForm(); // Call the custom validation function
});

// Function to manually submit the form with errors
function submitFormWithErrors() {
  // Submit the form
  document.getElementById("myForm").submit();
}

// Attach the submitFormWithErrors function to a button click event
document.getElementById("submitButton").addEventListener("click", function () {
  submitFormWithErrors(); // Call the function to submit the form with errors
});

function submitForm() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const commentsInput = document.getElementById("comments");

  // Check for errors
  validateName();
  validateEmail();

  // Check if there are any validation errors
  const nameError = document.querySelector("output[name='nameError']").textContent;
  const emailError = document.querySelector("output[name='emailError']").textContent;

  if (nameError || emailError) {
    // If there are errors, capture them in an array
    const formErrors = [];

    if (nameError) {
      formErrors.push({ field: "name", error: nameError });
    }

    if (emailError) {
      formErrors.push({ field: "email", error: emailError });
    }

    // Encode the errors in JSON format and set it as the value of the hidden input field
    const formErrorsInput = document.getElementById("form-errors-input");
    formErrorsInput.value = JSON.stringify(formErrors);

    // You can display the errors to the user or handle them as needed
    alert("Please correct the form errors before submitting.");
  } else {
    // If no errors, submit the form
    document.getElementById("myForm").submit();
  }
}