document.addEventListener("DOMContentLoaded", function () {});

const token = localStorage.getItem("token");

const createBlog = async (formData) => {
  document.getElementById("loader").style.display = "block";

  try {
    const response = await fetch(
      "https://my-brand-backend-tfnq.onrender.com/api/v1/blogs/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error("Failed to create blog");
    }
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  } finally {
    document.getElementById("loader").style.display = "none";
  }
};

const blogForm = document.getElementById("blogForm");

blogForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("title", document.getElementById("title").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("content", document.getElementById("content").value);
  formData.append("image", document.getElementById("image").files[0]);

  try {
    await createBlog(formData);
    alert("Blog created successfully!");
    blogForm.reset();
  } catch (error) {
    alert("Failed to create blog. Please try again.");
    console.error("Error creating blog:", error);
  }
});
