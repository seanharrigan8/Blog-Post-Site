// Function to handle logout
async function logout() {
    // Clear any personal information or session data
    await clearPersonalInformation();

    // Redirect the user back to the login page
    await fetch("/clearPersonalInfo", { method: "POST" });
    window.location.href = "/login.html";
}

// Function to clear personal information
async function clearPersonalInformation() {
    // Code to clear personal information goes here
    // For example:
    await fetch('/clearPersonalInfo', { method: 'POST' });
}

// Get the logout button element
const logoutButton = document.querySelector("#logoutButton");

// Add click event listener to the logout button
logoutButton.addEventListener("click", logout);
