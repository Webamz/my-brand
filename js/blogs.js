document.addEventListener("DOMContentLoaded", function () {
  loadBlogs();
});
async function loadBlogs() {
  const blogContainer = document.getElementById('blogContainer');

  try {
    const response = await fetch('http://localhost:3000/api/blogs');
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const blogs = await response.json();
    blogs.forEach(function (blog) {
      const blogPost = document.createElement('div');
      blogPost.classList.add('blog-post');

      blogPost.innerHTML = `
        <div class="blog-post_img">
          <img src="${blog.image}" alt="Blog Post Image" />
        </div>
        <div class="blog-post_info">
          <div class="blog-post_date">
            <span>${new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 class="blog-post_title">${blog.title}</h1>
          <p class="blog-post_text">${blog.description}</p>
          <div class="blog-post_icons">
            <!-- Add your like and comment icons here -->
          </div>
          <a href="blog-details.html?id=${blog._id}" class="blog-post_cta">Read More</a>
        </div>
      `;

      blogContainer.appendChild(blogPost);
    });
  } catch (error) {
    console.error('Error fetching blogs:', error.message);
  }
}

function updateLocalStorage(blog) {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const index = blogs.findIndex((b) => b.id === blog.id);
  if (index !== -1) {
    blogs[index] = blog;
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }
}
