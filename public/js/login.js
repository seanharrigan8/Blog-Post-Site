

// Function to handle login
async function handleLogin(event) {
    // Prevent form submission
    event.preventDefault();

    // Get the username and password from the form
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    console.log("email", email);
    console.log("password", password);

    // Send a POST request to the login API endpoint
    // if (email && password) {
    const response = fetch("/api/login", {
        method: "POST",
       
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    console.log("response:", response);


            if (response.ok) {
                console.log("Login successful");
                // If login is successful, parse the response as JSON
               document.location.replace('/dashboard');
            } else {
                // If login fails, throw an error
               alert('Failed to log in');
            }
        }
    
    // 
    
    //     .then((data) => {
    //         // If login is successful, log the response data and redirect to the dashboard
    //         console.log("Login successful:", data);
    //         window.location.href = "/dashboard";
    //     })
    //     .catch((error) => {
    //         // If an error occurs during login, log the error
    //         console.error("Error occurred during login:", error);

        


// Attach the handleLogin function to the form's submit event
document.getElementById("loginForm").addEventListener("submit", handleLogin);
