// Function to save user credentials


async function saveUserCredentials(event) {
  event.preventDefault();
  const email = document.getElementById('email-signup').value;  
  const password = document.getElementById('password').value;
  

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
   
    if(response.ok) {
      console.log('User credentials saved successfully');
      document.location.replace('/dashboard');
    }else {
      alert('Failed to save user credentials');
    }
  
}



  
document.getElementById('signUp').addEventListener('submit', saveUserCredentials);
