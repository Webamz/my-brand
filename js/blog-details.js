document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  // Get blog details
  const blog = getBlogDetails(blogId);

  // Update blog details
  updateBlogDetails(blog);

  // Update comments section
  updateComments();
});

// Function to post comments
function postComment() {
  const commentText = document.getElementById("comment-text").value;

  const newComment = {
    author: "User",
    date: new Date().toLocaleDateString(),
    text: commentText,
    blogId: parseInt(new URLSearchParams(window.location.search).get("id")),
  };

  let existingComments = JSON.parse(localStorage.getItem("blogComments")) || [];

  existingComments.push(newComment);

  localStorage.setItem("blogComments", JSON.stringify(existingComments));

  updateComments();

  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  let blogIndex = blogs.findIndex((blog) => blog.id === newComment.blogId);
  if (blogIndex !== -1) {
    blogs[blogIndex].commentsNumber = (blogs[blogIndex].commentsNumber || 0) + 1;
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }

  document.getElementById("comment-text").value = "";
}

// Function to update comments
function updateComments() {
  const commentsSection = document.querySelector(".comments-section");

  const comments = JSON.parse(localStorage.getItem("blogComments")) || [];

  commentsSection.innerHTML = "";

  const blogId = parseInt(new URLSearchParams(window.location.search).get("id"));
  const blogComments = comments.filter((comment) => comment.blogId === blogId);

  blogComments.forEach(function (comment) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    const commentHeader = document.createElement("div");
    commentHeader.classList.add("comment-header");
    commentHeader.innerHTML =
      '<span class="comment-author">' +
      comment.author +
      "</span>" +
      '<span class="comment-date">' +
      comment.date +
      "</span>";

    const commentBody = document.createElement("div");
    commentBody.classList.add("comment-body");
    commentBody.textContent = comment.text;

    commentDiv.appendChild(commentHeader);
    commentDiv.appendChild(commentBody);
    commentsSection.appendChild(commentDiv);
  });

  const commentCountElement = document.getElementById("comments-number");
  commentCountElement.textContent = "Comments (" + blogComments.length + ")";
}

// Function to get blog details
function getBlogDetails(blogId) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const blog = blogs.find((blog) => blog.id === parseInt(blogId));

  return blog;
}

// Function to update blog details in the DOM
function updateBlogDetails(blog) {
  if (blog) {
    document.getElementById("blog-title").textContent = blog.title;
    document.getElementById("blog-author").textContent = blog.author;
    document.getElementById("blog-date").textContent = blog.timecreated;
    document.getElementById("blog-content").textContent = blog.content;

    const blogImage = document.querySelector(".blog-post-img img");
    blogImage.src = blog.image;
    blogImage.alt = "Blog Post Image";

    const likeButton = document.querySelector(".like-button");
    const likeCount = document.querySelector(".likes-count");
    let liked = false;

    likeButton.addEventListener("click", function () {
      liked = !liked;
      if (liked) {
        blog.likeNumber++;
      } else {
        blog.likeNumber--;
      }
      likeCount.textContent = blog.likeNumber;
      updateLocalStorage(blog);
    });

    likeCount.textContent = blog.likeNumber;
  }
}

// Function to update localStorage
function updateLocalStorage(blog) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  const index = blogs.findIndex((b) => b.id === blog.id);
  if (index !== -1) {
    blogs[index] = blog;
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }
}
