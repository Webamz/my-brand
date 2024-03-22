document.addEventListener("DOMContentLoaded", function () {
  loadBlogs();
});

function loadBlogs() {
  const blogContainer = document.getElementById('blogContainer');

  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];

  blogs.forEach(function (blog) {
    const blogPost = document.createElement('div');
    blogPost.classList.add('blog-post');

    blogPost.innerHTML = `
      <div class="blog-post_img">
        <img src="${blog.image}" alt="Blog Post Image" />
      </div>
      <div class="blog-post_info">
        <div class="blog-post_date">
          <span>${blog.author}</span>
          <span>${blog.timecreated}</span>
        </div>
        <h1 class="blog-post_title">${blog.title}</h1>
        <p class="blog-post_text">${blog.description}</p>
        <div class="blog-post_icons">
          <i class="far fa-heart like-button"></i> <span class="likes-count">${blog.likeNumber}</span>
          <i class="far fa-comment"></i> <span class="comments-count">${blog.commentsNumber}</span>
        </div>
        <a href="blog-details.html?id=${blog.id}" class="blog-post_cta">Read More</a>
      </div>
    `;

    const likeButton = blogPost.querySelector('.like-button');
    likeButton.addEventListener('click', function () {
      blog.likeNumber++;
      const likesCount = blogPost.querySelector('.likes-count');
      likesCount.textContent = blog.likeNumber;
      updateLocalStorage(blog);
    });

    blogContainer.appendChild(blogPost);
  });
}

function updateLocalStorage(blog) {
  const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
  const index = blogs.findIndex((b) => b.id === blog.id);
  if (index !== -1) {
    blogs[index] = blog;
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }
}
