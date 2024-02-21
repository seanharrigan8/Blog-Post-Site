// Function to add a comment
function addComment(postId, commentText) {
  // Get the user's login value from the session
  const userLogin = getSessionUserLogin();

  // Create a new comment object
  const comment = {
    postId: postId,
    text: commentText,
    userLogin: userLogin
  };

  // Save the comment to the database
  saveCommentToDatabase(comment);
}

// Function to get the user's login value from the session
function getSessionUserLogin() {
  // Implement your logic to retrieve the user's login value from the session
  // For example:
  // return session.user.login;
}

// Function to save the comment to the database
function saveCommentToDatabase(comment) {
  // Implement your logic to save the comment to the database
  // For example:
  // database.saveComment(comment);
}


document.getElementById('submit-comment').addEventListener('click', function() {
  const postId = document.getElementById('post-id').value;
  const commentText = document.getElementById('comment-text').value;
  addComment(postId, commentText);
});
