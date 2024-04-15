document.addEventListener("DOMContentLoaded", function () {
});

const createBlog = async (formData) => {
  try {
    const response = await fetch('http://localhost:3000/api/blogs/create', {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Blog created successfully:', responseData);
      return responseData;
    } else {
      throw new Error('Failed to create blog');
    }
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

const blogForm = document.getElementById('blogForm');

blogForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append('title', document.getElementById('title').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('content', document.getElementById('content').value);
  formData.append('image', document.getElementById('image').files[0]);

  try {
    await createBlog(formData);
    alert('Blog created successfully!');
    blogForm.reset();
  } catch (error) {
    alert('Failed to create blog. Please try again.');
    console.error('Error creating blog:', error);
  }
});
