document.addEventListener('DOMContentLoaded', function () {
  function displayBlogDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = parseInt(urlParams.get('id'));

    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    const blog = blogs.find(blog => blog.id === blogId);

    if (!blog) {
      alert('Blog not found!');
      return;
    }

    const blogComments = JSON.parse(localStorage.getItem('blogComments')) || [];
    const commentsForBlog = blogComments.filter(comment => comment.blogId === blogId);

    const blogImage = document.querySelector('.blog-image');
    blogImage.src = blog.image;

    const commentsContainer = document.querySelector('.comments');
    commentsContainer.innerHTML = '<h3>Comments</h3>';
    commentsForBlog.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');
      commentDiv.textContent = comment.text;
      commentsContainer.appendChild(commentDiv);
    });

    document.getElementById('title').value = blog.title;
    document.getElementById('author').value = blog.author;
    document.getElementById('content').value = blog.content;
    document.getElementById('image').value = blog.image;
  }

  // Function to update blog details
  function updateBlogDetails(updatedTitle, updatedAuthor, updatedContent, updatedImage) {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = parseInt(urlParams.get('id'));

    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

    const index = blogs.findIndex(blog => blog.id === blogId);

    // Update the blog details
    if (index !== -1) {
      blogs[index].title = updatedTitle;
      blogs[index].author = updatedAuthor;
      blogs[index].content = updatedContent;
      blogs[index].image = updatedImage;

      localStorage.setItem('blogs', JSON.stringify(blogs));

      alert('Blog details updated successfully!');
    } else {
      alert('Blog not found!');
    }
  }

  // Function to delete a blog
  function deleteBlog() {
    const confirmed = confirm('Are you sure you want to delete this blog?');

    if (confirmed) {
      const urlParams = new URLSearchParams(window.location.search);
      const blogId = parseInt(urlParams.get('id'));

      let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

      blogs = blogs.filter(blog => blog.id !== blogId);

      localStorage.setItem('blogs', JSON.stringify(blogs));

      alert('Blog deleted successfully!');

      // Delete associated comments
      deleteCommentsForBlog(blogId);

      window.location.href = '../pages/admin-blogs.html';
    }
  }

  // Function to delete comments associated with a blog
  function deleteCommentsForBlog(blogId) {
    let blogComments = JSON.parse(localStorage.getItem('blogComments')) || [];

    blogComments = blogComments.filter(comment => comment.blogId !== blogId);

    localStorage.setItem('blogComments', JSON.stringify(blogComments));
  }

  const updateBtn = document.getElementById('updateBtn');
  updateBtn.addEventListener('click', function () {
    const updatedTitle = document.getElementById('title').value;
    const updatedAuthor = document.getElementById('author').value;
    const updatedContent = document.getElementById('content').value;
    const updatedImage = document.getElementById('image').value;

    // Update blog details
    updateBlogDetails(updatedTitle, updatedAuthor, updatedContent, updatedImage);
  });

  const deleteBlogBtn = document.getElementById('deleteBlogBtn');
  deleteBlogBtn.addEventListener('click', function () {
    deleteBlog();
  });

  displayBlogDetails();
});
