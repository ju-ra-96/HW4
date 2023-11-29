/* function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("active");
  }
   */

  // Function to toggle the theme and save preference to localStorage
function toggleTheme() {
  const body = document.body;
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
}

// Event listener for the theme switcher button
document.getElementById('theme-switcher').addEventListener('click', toggleTheme);

// Check for a saved theme preference in localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('myForm');
  const comments = document.getElementById('comments');
  const errorOutput = document.getElementById('errorOutput'); // Make sure you have this element in your HTML
  const infoOutput = document.getElementById('infoOutput'); // Make sure you have this element in your HTML
  let formErrors = [];

  // Improved validation
 /*  form.addEventListener('input', function(event) {
    const target = event.target;
    if (!target.checkValidity()) {
      target.classList.add('invalid');
      target.setCustomValidity('Invalid input, please enter a valid e-mail address!');
    } else {
      target.classList.remove('invalid');
      target.setCustomValidity('');
    }
  }); */



  // Length reporting for textarea
  comments.addEventListener('input', function() {
    const maxLength = comments.getAttribute('maxlength');
    const remainingChars = maxLength - comments.value.length;
    showRemainingChars(remainingChars);

    if (remainingChars <= 0) {
      showError(comments, 'You have reached the character limit.');
    }
  });

  // Form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Validate each field
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (!input.checkValidity()) {
        formErrors.push({ field: input.name, error: input.validationMessage });
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    });

    // Include form errors as a hidden input
    const errorsInput = document.createElement('input');
    errorsInput.type = 'hidden';
    errorsInput.name = 'form-errors';
    errorsInput.value = JSON.stringify(formErrors);
    form.appendChild(errorsInput);

    // You would normally submit the form here
    // form.submit();
    
    // For demonstration, we'll log the formErrors and halt submission
    console.log(formErrors);
    return false; // Prevent form submission for demo purposes
  });
});

function showError(input, message) {
  const errorSpan = input.nextElementSibling; // This expects an <span> right after each input for error messages
  errorSpan.textContent = message;
  errorSpan.classList.add('error');
  setTimeout(() => errorSpan.classList.remove('error'), 3000); // Remove the error message after 3 seconds
}

function showRemainingChars(remaining) {
  if (remaining >= 0) {
    infoOutput.textContent = `${remaining} characters remaining.`;
    infoOutput.classList.remove('error');
    if (remaining <= 10) {
      infoOutput.classList.add('warning');
    } else {
      infoOutput.classList.remove('warning');
    }
  } else {
    infoOutput.textContent = 'Character limit exceeded!';
    infoOutput.classList.add('error');
  }
}

export function validateName() {
  var nameInput = document.getElementById('name');
  var errorDiv = document.getElementById('nameError');

  if (nameInput.value === '') {
    // If the name field is empty, clear the error message
    errorDiv.textContent = '';
    nameInput.classList.remove('invalid');
  } else if (!/^[a-zA-Z]+$/.test(nameInput.value)) {
    // If the name field contains non-alphabetic characters, display an error message
    errorDiv.textContent = 'Invalid name. Only alphabetic characters are allowed.';
    nameInput.classList.add('invalid');
  } else {
    // If the name field contains only alphabetic characters, clear the error message
    errorDiv.textContent = '';
    nameInput.classList.remove('invalid');
  }
}


// Event listener for when the DOM is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('name').addEventListener('input', validateName);
});

function validateEmail() {
  var emailInput = document.getElementById('email');
  var errorDiv = document.getElementById('emailError');

  // Regular expression for basic email validation
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailInput.value === '') {
    // If the email field is empty, clear the error message
    errorDiv.textContent = '';
    emailInput.classList.remove('invalid');
  } else if (!emailPattern.test(emailInput.value)) {
    // If the email doesn't match the pattern, display an error message
    errorDiv.textContent = 'Please enter a valid email address.';
    emailInput.classList.add('invalid');
  } else {
    // If the email matches the pattern, clear the error message
    errorDiv.textContent = '';
    emailInput.classList.remove('invalid');
  }
}
document.getElementById('email').addEventListener('input', validateEmail);

const email = document.getElementById("mail");

email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an email address!");
  } else {
    email.setCustomValidity("");
  }
});
