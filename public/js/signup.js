// Function to save user credentials
async function saveUserCredentials(username, password) {
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    console.log('User credentials saved successfully');
  } catch (error) {
    console.error('Error saving user credentials:', error);
  }
}

// Function to handle log in process
async function logIn() {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    console.log('Logged in successfully');
  } catch (error) {
    console.error('Error logging in:', error);
  }
}
  
document.getElementById('signup').addEventListener('submit', async function(event) {  event.preventDefault(); // Prevent form submission

  // Redirect to signup page
  window.location.href = '/signup';
});
