document.addEventListener("DOMContentLoaded", function () {
  const blogId = new URLSearchParams(window.location.search).get("id");

  document.querySelector(
    ".logo a"
  ).href = `../pages/blog-actions.html?id=${blogId}`;
  loadLikes();

  displayComments();
});

async function displayComments() {
  const blogId = new URLSearchParams(window.location.search).get("id");
  document.getElementById("loader").style.display = "block";

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
        `<span><button class="btn delete-btn deleteCommentBtn" data-comment-id=${comment._id}>Delete</button></span> <br>` +
        '<span class="comment-date">' +
        new Date(comment.createdAt).toLocaleDateString() +
        "    " +
        '<span class="comment-author">' +
        comment.username +
        "</span>" +
        '<span id="comment-id" hidden>' +
        comment._id +
        "</span>";

      const commentBody = document.createElement("div");
      commentBody.classList.add("comment-body");
      commentBody.textContent = comment.message;

      commentDiv.appendChild(commentHeader);
      commentDiv.appendChild(commentBody);
      commentsSection.appendChild(commentDiv);
    });

    deleteComments();
  } catch (error) {
    console.error("Error fetching comments:", error);
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}

async function loadLikes() {
  const blogId = new URLSearchParams(window.location.search).get("id");
  document.getElementById("loader").style.display = "block";

  try {
    const response = await fetch(
      `https://my-brand-backend-tfnq.onrender.com/api/v1/like/get/${blogId}`
    );
    const likes = await response.json();

    const likesSection = document.querySelector(".likes-section");
    likesSection.innerHTML = "";

    const likesCount = document.getElementById("likes-count");
    likesCount.textContent = "Likes (" + likes.length + ")";

    likes.forEach((like) => {
      const likeDiv = document.createElement("div");
      likeDiv.innerHTML = `<button class="btn delete-btn deleteLikeBtn" data-comment-id=${like._id}>Delete Like</button> <br>`;
      likesSection.appendChild(likeDiv);
    });

    deleteLikes();
  } catch (error) {
    console.error(error);
  } finally {
    document.getElementById("loader").style.display = "none";
  }
}

async function deleteComment(commentId) {
  console.log("Delete button clicked for commentId:", commentId);
  const confirmed = confirm("Are you sure you want to delete this blog?");

  if (confirmed) {
    document.getElementById("loader").style.display = "block";

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://my-brand-backend-tfnq.onrender.com/api/v1/comment/delete/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      alert("Blog deleted successfully!");
      displayComments();

      //   window.location.href = '../pages/admin-blogs.html';
    } catch (error) {
      console.error("Error deleting blog:", error.message);
    } finally {
      document.getElementById("loader").style.display = "none";
    }
  }
}

function deleteComments() {
  const deleteButtons = document.querySelectorAll(".deleteCommentBtn");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", function (event) {
      event.preventDefault();
      const commentId = this.getAttribute("data-comment-id");
      deleteComment(commentId);
    });
  });
}

function deleteLikes() {
  const deleteButtons = document.querySelectorAll(".deleteLikeBtn");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", function (event) {
      event.preventDefault();
      const likeId = this.getAttribute("data-comment-id");
      deleteLike(likeId);
    });
  });
}

async function deleteLike(likeId) {
  const confirmed = confirm("Are you sure you want to delete this like?");
  const token = localStorage.getItem("token");

  if (confirmed) {
    document.getElementById("loader").style.display = "block";

    try {
      const response = await fetch(
        `https://my-brand-backend-tfnq.onrender.com/api/v1/like/delete/${likeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete like");
      }

      alert("Like deleted successfully!");
      loadLikes();
    } catch (error) {
      console.error("Error deleting like:", error.message);
    } finally {
      document.getElementById("loader").style.display = "none";
    }
  }
}
