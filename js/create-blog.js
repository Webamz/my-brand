document.addEventListener("DOMContentLoaded", function () {
  createBlog();
});


// Function to create blog
function createBlog() {
  const blogForm = document.getElementById('blogForm');

  blogForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;
    const image = document.getElementById('image').value;
    const timecreated = new Date().toLocaleString();
    const commentsNumber = 0;
    const likeNumber = 0;

    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    // Create blog object
    const blog = {
      id: blogs.length + 1,
      title: title,
      description: description,
      content: content,
      author: author,
      image: image,
      timecreated: timecreated,
      commentsNumber: commentsNumber,
      likeNumber: likeNumber
    };

    blogs.push(blog);
    localStorage.setItem('blogs', JSON.stringify(blogs));

    blogForm.reset();
  });
}


