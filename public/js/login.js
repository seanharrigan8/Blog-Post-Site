
// Function to handle login
async function handleLogin() {
    try {
        // Get the username and password from the form
        const username = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();

        if (response.ok) {
            // If login is successful, redirect to the homepage
            window.location.href = '/dashboard';
        } else {
            alert(data.message);
        }
    }
    catch (error) {
        console.error('Error occurred during login:', error);
    }
}


// Event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission
    await handleLogin(); // Call the handleLogin function
});
