document.addEventListener("DOMContentLoaded", function () {
  displayProjectDetails();

  const updateBtn = document.getElementById("updateBtn");
  updateBtn.addEventListener("click", function () {
    updateProjectDetails();
  });

  const deleteBtn = document.getElementById("deleteBtn");
  deleteBtn.addEventListener("click", function () {
    deleteProject();
  });
});

async function displayProjectDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  try {
    const response = await fetch(
      `https://my-brand-backend-tfnq.onrender.com/api/v1/projects/find/${projectId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch project details");
    }

    const project = await response.json();
    console.log("The project: ", project);
    document.getElementById("title").value = project.projectname;
    document.getElementById("description").value = project.description;
    document.getElementById("github").value = project.githubLink;
    document.getElementById("imagePreview").src = project.image;
  } catch (error) {
    console.error("Error fetching project details:", error.message);
    return null;
  }
}

// Function to update blog details
async function updateProjectDetails() {
  const confirmed = confirm("Are you sure you want to update this project?");
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("projectname", document.getElementById("title").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("githubLink", document.getElementById("github").value);
  formData.append("image", document.getElementById("image").files[0]);

  if (confirmed) {
    try {
      const response = await fetch(
        `https://my-brand-backend-tfnq.onrender.com/api/v1/projects/update/${projectId}`,
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
        alert("Project updated successfully");
        console.log("Project updated successfully:", responseData);
        displayProjectDetails();
        return responseData;
      } else {
        throw new Error("Failed to update the project");
      }
    } catch (error) {
      console.error("Error updating the project:", error);
      throw error;
    }
  }
}

// Function to delete a blog
async function deleteProject() {
  const confirmed = confirm("Are you sure you want to delete this blog?");

  if (confirmed) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://my-brand-backend-tfnq.onrender.com/api/v1/projects/delete/${projectId}`,
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

      alert("Project deleted successfully!");

      window.location.href = "../pages/admin-projects.html";
    } catch (error) {
      console.error("Error deleting project:", error.message);
    }
  }
}
