document.addEventListener("DOMContentLoaded", function () {});

const createProject = async (formData) => {
  document.getElementById("loader").style.display = "block";

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "https://my-brand-backend-tfnq.onrender.com/api/v1/projects/create",
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
      throw new Error("Failed to create project");
    }
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  } finally {
    document.getElementById("loader").style.display = "none";
  }
};

const projectForm = document.getElementById("projectForm");

projectForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("projectname", document.getElementById("projectname").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("githubLink", document.getElementById("githublink").value);
  formData.append("image", document.getElementById("image").files[0]);

  try {
    await createProject(formData);
    alert("Project created successfully!");
    projectForm.reset();
  } catch (error) {
    alert("Failed to create project. Please try again.");
    console.error("Error creating project:", error);
  }
});
