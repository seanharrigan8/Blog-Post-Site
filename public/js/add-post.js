// Dependencies: sequelize, mysql2, await functions, async functions, fetch api, handlebars

// Function to handle submit button click
async function handleAddPost() {
    // Get the title and content of the post from the input fields
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    try {
        // Send a post request to the server with the new post data
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        // Check if the request was successful
        if (response.ok) {
            // Redirect to the dashboard page
            window.location.href = '/dashboard';
        } else {
            // Display an error message
            console.error('Failed to add post');
        }
    } catch (error) {
        // Display the error message
        console.error('Failed to send post request:', error);
    }
}

// Add event listener to the submit button
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', handleAddPost);

