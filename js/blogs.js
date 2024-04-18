document.addEventListener("DOMContentLoaded", function () {
  loadBlogs();
});

async function loadBlogs() {
  const blogContainer = document.getElementById("blogContainer");
  document.getElementById("loader").style.display = "block";

  try {
    const response = await fetch(
      "https://my-brand-backend-tfnq.onrender.com/api/v1/blogs"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const blogs = await response.json();
    blogs.forEach(async function (blog) {
      const responseLikes = await fetch(
        `https://my-brand-backend-tfnq.onrender.com/api/v1/like/get/${blog._id}`
      );
      const responseComments = await fetch(
        `https://my-brand-backend-tfnq.onrender.com/api/v1/blogs/${blog._id}/comments`
      );

      const likes = await responseLikes.json();
      const comments = await responseComments.json();

      const blogPost = document.createElement("div");
      blogPost.classList.add("blog-post");

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
             <i class="far fa-heart like-button"></i> <span class="likes-count">${
               likes.length
             }</span>
          <i class="far fa-comment"></i> <span class="comments-count">${
            comments.length
          }</span>
        </div>            
          </div>
          <a href="blog-details.html?id=${
            blog._id
          }" class="blog-post_cta">Read More</a>
        </div>
      `;

      blogContainer.appendChild(blogPost);
      document.getElementById("loader").style.display = "none";
    });
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
  }
}
