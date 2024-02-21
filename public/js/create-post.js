// Assuming you have imported necessary libraries and set up the necessary HTML elements and event listeners
import { createPost } from './api.js';
se
// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values from the form inputs
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  // Create an object with the post data
  const postData = {
    title: title,
    content: content
    // Add more properties as needed based on your database columns
  };

  // Send the post data to the server using an AJAX request or fetch API
  // Example using fetch API
  fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log('Post created:', data);
      // Redirect to the newly created post page or perform any other necessary actions
    })
    .catch(error => {
      console.error('Error creating post:', error);
      // Handle the error
    });
}

// Add an event listener to the form submit button
const form = document.getElementById('create-post-form');
form.addEventListener('submit', handleFormSubmit);
