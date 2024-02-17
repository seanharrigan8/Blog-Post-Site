//display homepage that that displays existing blog posts. Fetch database and render on the page//
//implement navigation links to homepage, dashboard, and login page//
const newPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    if (title && content) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};
document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostHandler);
    
// Path: Blog-Post-Site/develop/pubblic/js/newPost.js
