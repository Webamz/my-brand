document.addEventListener("DOMContentLoaded", function () {
});

const createProject = async (formData) => {
  try {
    const response = await fetch('http://localhost:3000/api/projects/create', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Project created successfully:', responseData);
      return responseData;
    } else {
      throw new Error('Failed to create project');
    }
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

const projectForm = document.getElementById('projectForm');

projectForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('projectname', document.getElementById('projectname').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('githubLink', document.getElementById('githublink').value);
  formData.append('image', document.getElementById('image').files[0]);

  try {
    await createProject(formData);
    alert('Project created successfully!');
    projectForm.reset();
  } catch (error) {
    alert('Failed to create project. Please try again.');
    console.error('Error creating project:', error);
  }
});
