// Initialize an array to store form errors
let formErrors = [];

// Validation function for the name field
function validateName() {
  const nameInput = document.getElementById("name");
  const nameErrorDiv = document.getElementById("nameError");

  if (!nameInput.validity.valid) {
    const errorMessage = nameInput.validationMessage;
    nameInput.classList.add("invalid");
    nameErrorDiv.textContent = errorMessage;
    nameErrorDiv.classList.add("error-message");
    formErrors.push({ field: "name", error: errorMessage, value: nameInput.value });
  } else {
    nameInput.classList.remove("invalid");
    nameErrorDiv.textContent = "";
    nameErrorDiv.classList.remove("error-message");
  }
}


// Validation function for the email field
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailErrorDiv = document.getElementById("emailError");

  if (!emailInput.validity.valid) {
    const errorMessage = emailInput.validationMessage;
    emailInput.classList.add("invalid");
    emailErrorDiv.textContent = errorMessage;
    emailErrorDiv.classList.add("error-message");
    formErrors.push({ field: "email", error: errorMessage, value: emailInput.value });
  } else {
    emailInput.classList.remove("invalid");
    emailErrorDiv.textContent = "";
    emailErrorDiv.classList.remove("error-message");
  }
}

// Update the remaining character count for the comments field
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



// Event listeners for input fields
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("name").addEventListener("input", validateName);
  document.getElementById("email").addEventListener("input", validateEmail);

  // Handle form submission
  document.getElementById("myForm").addEventListener("submit", (event) => {
    console.log("Form submitted. Errors:", formErrors);
    const formErrorsInput = document.getElementById("form-errors-input");
    formErrorsInput.value = JSON.stringify(formErrors);

    // Only one conditional check for formErrors is needed
   /*  if (formErrors.length > 0) {
        event.preventDefault(); // Prevent form submission if there are errors
        console.log("Form has errors, not submitting");
    } else {
        console.log("Form is valid, submitting");
        // You can manually submit the form here if needed
        // event.target.submit();
    } */
});

});
 // Length reporting for textarea
 comments.addEventListener("input", function () {
  const maxLength = comments.getAttribute("maxlength");
  const remainingChars = maxLength - comments.value.length;
  showRemainingChars(remainingChars, comments);
});

// Function to toggle the theme
function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'light') {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
    document.getElementById('theme-toggle').textContent = '🌞'; // Sun icon for light mode
  } else {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
    document.getElementById('theme-toggle').textContent = '🌜'; // Moon icon for dark mode
  }
}

// Event listener for the theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    document.getElementById('theme-toggle').textContent = '🌞';
  } else {
    document.getElementById('theme-toggle').textContent = '🌜';
  }
});
