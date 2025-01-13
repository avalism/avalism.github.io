// JavaScript to handle login, adding, and deleting diary entries

const correctPassword = "yourSecretPassword";  // Replace with your actual secret password
let isAuthenticated = false;  // Flag to track if the user is logged in

// Authentication logic
document.getElementById("loginButton").addEventListener("click", function() {
    const passwordInput = document.getElementById("authPassword").value;

    if (passwordInput === correctPassword) {
        isAuthenticated = true;  // User is authenticated
        document.getElementById("authSection").style.display = "none";  // Hide the login form
        document.getElementById("diarySection").style.display = "block";  // Show the diary form
        showDeleteButtons();  // Show delete buttons for entries
    } else {
        document.getElementById("authError").style.display = "block";  // Show error message
    }
});

// Show the delete buttons for authenticated users
function showDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach(button => {
        button.classList.remove("hidden");
    });
}

// Add new diary entry
document.getElementById("diaryForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get values from the form
    const title = document.getElementById("entryTitle").value;
    const content = document.getElementById("entryContent").value;

    // Validation: Check if the title is not empty
    if (title.trim() === "") {
        alert("Title is required!");
        return;  // Exit if the title is empty
    }

    // Create a new entry element
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("entry");

    // Add the title as the header and the content below it
    entryDiv.innerHTML = `
        <h2>${title}</h2>
        <p>${content}</p>
        <button class="deleteButton hidden">Delete</button>
    `;

    // If authenticated, show the delete button
    if (isAuthenticated) {
        const deleteButton = entryDiv.querySelector(".deleteButton");
        deleteButton.classList.remove("hidden"); // Remove hidden class to show the delete button
        
        // Add delete functionality
        deleteButton.addEventListener("click", function() {
            entryDiv.remove();  // Remove the entry from the list
        });
    }

    // Append the new entry to the entry list
    document.getElementById("entryList").appendChild(entryDiv);

    // Clear the form fields
    document.getElementById("diaryForm").reset();
});
