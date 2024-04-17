document.addEventListener("DOMContentLoaded", function () {
  async function displayBlogDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    try {
      const response = await fetch(
        `https://my-brand-backend-tfnq.onrender.com/api/v1/blogs/find/${blogId}`
      );
      const commentsResponse = await fetch(
        `https://my-brand-backend-tfnq.onrender.com/api/v1/blogs/${blogId}/comments`
      );
      const likesResponse = await fetch(
        `https://my-brand-backend-tfnq.onrender.com/api/v1/like/get/${blogId}`
      );

      if (!response.ok && !commentsResponse.ok && !likesResponse) {
        throw new Error("Failed to fetch blog details");
      }
      const comments = await commentsResponse.json();
      const likes = await likesResponse.json();
      const blog = await response.json();

      console.log("The bog: ", blog);

      document.getElementById("title").value = blog.title;
      document.getElementById("description").value = blog.description;
      document.getElementById("content").textContent = blog.content;
      document.getElementById("imagePreview").src = blog.image;

      document.getElementById("comments").textContent = comments.length;
      document.getElementById("likes").textContent = likes.length;

      const viewComments = document.getElementById("commentsBtn");
      const viewLikes = document.getElementById("likesBtn");

      viewComments.addEventListener("click", () => {
        window.location.href = `blog-likes-comments.html?id=${blogId}`;
      });

      viewLikes.addEventListener("click", () => {
        window.location.href = `blog-likes-comments.html?id=${blogId}`;
      });
    } catch (error) {
      console.error("Error fetching blog details:", error.message);
      return null;
    }
  }

  // Function to update blog details
  async function updateBlogDetails() {
    const confirmed = confirm("Are you sure you want to update this blog?");
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get("id");

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append(
      "description",
      document.getElementById("description").value
    );
    formData.append("content", document.getElementById("content").value);
    formData.append("image", document.getElementById("image").files[0]);

    if (confirmed) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://my-brand-backend-tfnq.onrender.com/api/v1/blogs/update/${blogId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          alert("Blog updated successfully");
          console.log("Blog updated successfully:", responseData);
          displayBlogDetails();

          return responseData;
        } else {
          throw new Error("Failed to update blog");
        }
      } catch (error) {
        console.error("Error creating blog:", error);
        throw error;
      }
    }
  }

  // Function to delete a blog
  async function deleteBlog() {
    const confirmed = confirm("Are you sure you want to delete this blog?");

    if (confirmed) {
      const urlParams = new URLSearchParams(window.location.search);
      const blogId = urlParams.get("id");
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `https://my-brand-backend-tfnq.onrender.com/api/v1/blogs/delete/${blogId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete blog");
        }

        alert("Blog deleted successfully!");

        window.location.href = "../pages/admin-blogs.html";
      } catch (error) {
        console.error("Error deleting blog:", error.message);
      }
    }
  }

  const updateBtn = document.getElementById("updateBtn");
  updateBtn.addEventListener("click", function () {
    // Update blog details
    updateBlogDetails();
  });

  const deleteBlogBtn = document.getElementById("deleteBlogBtn");
  deleteBlogBtn.addEventListener("click", function () {
    deleteBlog();
  });

  displayBlogDetails();
});
