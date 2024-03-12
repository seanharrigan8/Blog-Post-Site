const logout = async () => {
  try {
    // Send a POST request to the server to log the user out
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // If the response is ok, redirect the user to the login page
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log out");
    }
  } catch (err) {
    console.error(err);
  }
};

// Get the logout button element
const logoutButton = document.querySelector("#logoutButton");

// Add click event listener to the logout button
logoutButton.addEventListener("click", logout);
