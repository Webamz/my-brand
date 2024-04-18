document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  getBlogDetails(blogId);

  displayComments();

  toggleCommentBox();

  loadLikes();
});

// Function to post comments
async function postComment() {
  try {
    document.getElementById("loader").style.display = "block";

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");
    const commentText = document
      .getElementById("comment-text")
      .value.toLowerCase();
    let userText = document.getElementById("comment-username").value;
    userText =
      userText.charAt(0).toUpperCase() + userText.slice(1).toLowerCase();

    const response = await fetch(
      `https://my-brand-backend-tfnq.onrender.com/api/v1/blogs/${blogId}/comments/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: blogId,
          message: commentText,
          username: userText,
        }),
      }
    );
    if (response.ok) {
      alert("Comment posted successfully");
      toggleCommentBox();
      displayComments();
    } else {
      throw new Error("Failed to post comment");
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  } finally {
    document.getElementById("loader").style.display = "none";
  }

  document.getElementById("comment-text").value = "";
}

// Function to get blog details
async function getBlogDetails(blogId) {
  try {
    document.getElementById("loader").style.display = "block";

    const response = await fetch(
      `https://my-brand-backend-tfnq.onrender.com/api/v1/blogs/find/${blogId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blog details");
    }
    const blog = await response.json();
    document.getElementById("blog-title").textContent = blog.title;
    document.querySelector(".blog-post-img img").src = blog.image;
    document.getElementById("blog-date").textContent = new Date(
      blog.createdAt
    ).toLocaleDateString();
    document.getElementById("blog-content").textContent = blog.content;
  } catch (error) {
    console.error("Error fetching blog details:", error.message);
    return null;
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}

// Function to display comments
async function displayComments() {
  const blogId = new URLSearchParams(window.location.search).get("id");

  try {
    const response = await fetch(
      `https://my-brand-backend-tfnq.onrender.com/api/v1/blogs/${blogId}/comments`
    );
    const comments = await response.json();

    const commentsSection = document.querySelector(".comments-section");
    commentsSection.innerHTML = "";

    const commentCount = document.getElementById("comments-number");
    commentCount.textContent = "Comments (" + comments.length + ")";

    comments.forEach((comment) => {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");

      const commentHeader = document.createElement("div");
      commentHeader.classList.add("comment-header");
      commentHeader.innerHTML =
        '<span class="comment-date">' +
        new Date(comment.createdAt).toLocaleDateString() +
        "    " +
        '<span class="comment-author">' +
        comment.username +
        "</span>";

      const commentBody = document.createElement("div");
      commentBody.classList.add("comment-body");
      commentBody.textContent = comment.message;

      commentDiv.appendChild(commentHeader);
      commentDiv.appendChild(commentBody);
      commentsSection.appendChild(commentDiv);
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

// Function for the comment bx
function toggleCommentBox() {
  const commentBox = document.getElementById("comment-box");
  const addCommentBtn = document.getElementById("add-comment-btn");

  if (commentBox.style.display === "none") {
    commentBox.style.display = "block";
    addCommentBtn.textContent = "Cancel";
  } else {
    commentBox.style.display = "none";
    addCommentBtn.textContent = "Add Comment";
  }
}

// Function to like a blog
async function likeBlog() {
  const blogId = new URLSearchParams(window.location.search).get("id");

  try {
    document.getElementById("loader").style.display = "block";

    const response = await fetch(
      `https://my-brand-backend-tfnq.onrender.com/api/v1/like/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: blogId,
        }),
      }
    );

    if (response.ok) {
      loadLikes();
    } else {
      console.error("Failed to like blog");
    }
  } catch (error) {
    console.error(error);
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}

// Function to load likes
async function loadLikes() {
  const blogId = new URLSearchParams(window.location.search).get("id");

  try {
    document.getElementById("loader").style.display = "block";

    const response = await fetch(
      `https://my-brand-backend-tfnq.onrender.com/api/v1/like/get/${blogId}`
    );
    const likes = await response.json();
    if (response.ok) {
      const likesCount = document.getElementById("likes-count");
      likesCount.textContent = "Likes (" + likes.length + ")";
    } else {
      console.error("Failed to get likes: ", error);
    }
  } catch (error) {
    console.error(error);
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}
