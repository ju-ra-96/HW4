// Initialize an array to store form errors
let formErrors = [];

// Validation function for the name field
function validateName() {
  const nameInput = document.getElementById("name");
  const nameErrorDiv = document.getElementById("nameError");

  const namePattern = /^[A-Za-z\s]*$/; // Pattern allows only letters and spaces
  
  // Check if the input value matches the pattern
  if (!namePattern.test(nameInput.value)) {
    showError(nameInput, "Only letters and spaces are allowed.");
    /* nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, ''); // Remove invalid characters */
  } else {
    // If valid, reset custom validity and continue with other validations
    nameInput.setCustomValidity("");
  }

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
  const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9.-]+\.[a-z]{2,}$/; // Pattern for a basic email structure
  
  // Check if the input value matches the pattern
  if (!emailPattern.test(emailInput.value)) {
    showError(emailInput, "Please enter a valid email address.");
    // Don't remove characters here, as it might interfere with email input
  } else {
    // If valid, reset custom validity and continue with other validations
    emailInput.setCustomValidity("");
  }

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

function showError(input, message) {
  const errorDiv = input.nextElementSibling; // This expects the error div to be right after each input
  errorDiv.textContent = message;
  errorDiv.classList.add('error-message', 'flash-error'); // Add both 'error-message' and 'flash-error' classes
  
  input.classList.add('invalid'); // Add 'invalid' class to the input field
  
  // Remove the error after 6 seconds
  setTimeout(() => {
    errorDiv.textContent = '';
    errorDiv.classList.remove('error-message', 'flash-error');
    input.classList.remove('invalid');
  }, 6000);
}

 // Theme objects with default values
 const themes = [
  {
      name: "Default",
      textColor: "black",
      backgroundColor: "white",
      fontSet: "Arial, sans-serif",
  },
  {
      name: "Dark Mode",
      textColor: "white",
      backgroundColor: "black",
      fontSet: "Verdana, sans-serif",
  },
  // Add more theme objects as needed
];

// Theme picker elements
const themeSelect = document.getElementById("theme-select");
const textColorPicker = document.getElementById("text-color-picker");
const bgColorPicker = document.getElementById("bg-color-picker");
const fontSelect = document.getElementById("font-select");
const saveThemeButton = document.getElementById("save-theme");

// Load themes from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  loadThemes();
  applySelectedTheme();
});

// Event listener for theme selection
themeSelect.addEventListener("change", applySelectedTheme);

// Event listener for save theme button
saveThemeButton.addEventListener("click", saveTheme);

// Load themes from local storage
function loadThemes() {
  const savedThemes = JSON.parse(localStorage.getItem("themes"));
  if (savedThemes) {
      themes.push(...savedThemes);
      updateThemeSelect();
  }
}

// Update the theme selection dropdown
function updateThemeSelect() {
  themeSelect.innerHTML = "";
  themes.forEach((theme) => {
      const option = document.createElement("option");
      option.value = theme.name;
      option.textContent = theme.name;
      themeSelect.appendChild(option);
  });
}

// Apply the selected theme
function applySelectedTheme() {
  const selectedThemeName = themeSelect.value;
  const selectedTheme = themes.find((theme) => theme.name === selectedThemeName);

  if (selectedTheme) {
      // Apply theme styles to the page
      document.body.style.color = selectedTheme.textColor;
      document.body.style.backgroundColor = selectedTheme.backgroundColor;
      document.body.style.fontFamily = selectedTheme.fontSet;
  }
}

// Save the current theme
function saveTheme() {
  const themeName = prompt("Enter a name for the theme:");
  if (themeName) {
      const newTheme = {
          name: themeName,
          textColor: textColorPicker.value,
          backgroundColor: bgColorPicker.value,
          fontSet: fontSelect.value,
      };

      themes.push(newTheme);
      updateThemeSelect();
      localStorage.setItem("themes", JSON.stringify(themes));
  }
}