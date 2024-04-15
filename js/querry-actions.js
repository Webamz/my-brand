document.addEventListener('DOMContentLoaded', function () {

  displayQuerryDetails();

  const updateBtn = document.getElementById('updateBtn');
  updateBtn.addEventListener('click', function () {
    updateQuerryDetails()
  });

  const deleteBtn = document.getElementById('deleteBtn');
  deleteBtn.addEventListener('click', function () {
    deleteQuerry();
  });

});

async function displayQuerryDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const querryId = urlParams.get('id')

  try {
      const response = await fetch(`http://localhost:3000/api/querries/find/${querryId}`, {
        credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch querry details')
    }

    const querry = await response.json();
    console.log('The querry: ', querry)
    document.getElementById('name').value = querry.firstname;
    document.getElementById('email').value = querry.email;
    document.getElementById('message').textContent = querry.message;
    document.getElementById('review').value = querry.review;

  } catch (error) {
    console.error('Error fetching details:', error.message);
    return null;
  }
}


// Function to update blog details
async function updateQuerryDetails() {
  const confirmed = confirm('Are you sure you want to update the querry?');
  const urlParams = new URLSearchParams(window.location.search);
  const querryId = urlParams.get('id');
  const review =  document.getElementById('review').value;

  if (confirmed) {
    try {
      const response = await fetch(`http://localhost:3000/api/querries/update/${querryId}`, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json",
          },
          credentials: 'include',
        body: JSON.stringify({
              review: review
          }),
      })

      if (response.ok) {
        const responseData = await response.json();
        alert('Querry updated successfully')
        console.log('Querry updated successfully:', responseData);
        return responseData;

      } else {
        throw new Error('Failed to update the project');
      }
    } catch (error) {
      console.error('Error updating the project:', error);
      throw error;
    }
  }
}

// Function to delete a blog
async function deleteQuerry() {
  const confirmed = confirm('Are you sure you want to delete this querry?');

  if (confirmed) {
    const urlParams = new URLSearchParams(window.location.search);
    const querryId = urlParams.get('id');

    try {
      const response = await fetch(`http://localhost:3000/api/querries/delete/${querryId}`, {
        method: 'DELETE',
        credentials: 'include'

      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      alert('Querry deleted successfully!');

      window.location.href = '../pages/admin-queries.html';
    } catch (error) {
      console.error('Error deleting project:', error.message);
    }
  }
}
