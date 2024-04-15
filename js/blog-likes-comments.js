document.addEventListener('DOMContentLoaded', function () {

    const blogId = new URLSearchParams(window.location.search).get("id");

    document.querySelector(".logo a").href = `../pages/blog-actions.html?id=${blogId}`;
    loadLikes()
    displayComments()


    delebuttons()
    // Loop through each delete button
    // const buttons = document.getElementsByName('.deleteCommentBtn')
    // buttons.forEach(btn => {
    //     console.log('this is a button')
    // })


    // deleteButton.addEventListener('click', async function () {
    //     const commentId = this.getAttribute('data-comment-id');
    //     await deleteComment(commentId);
    //     // After deleting, refresh comments
    //     displayComments();
    // });

    // deleteAction.addEventListener('click', function () {
    //     const commentId = document.getElementsByName('deleteCommentBtn')
    //     deleteComment(commentId)
    //     console.log('The button is clicked and ID is ', commentId)
    // })


    
})

async function displayComments() {
    const blogId = new URLSearchParams(window.location.search).get("id");
    try {
        const response = await fetch(`http://localhost:3000/api/blogs/${blogId}/comments`);
        const comments = await response.json();

        const commentsSection = document.querySelector(".comments-section");
        commentsSection.innerHTML = "";

        const commentCount = document.getElementById("comments-number");
        commentCount.textContent = "Comments (" + comments.length + ")";

        comments.forEach(comment => {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");

            const commentHeader = document.createElement("div");
            commentHeader.classList.add("comment-header");
            commentHeader.innerHTML =
                `<span><button class="btn delete-btn deleteCommentBtn" data-comment-id=${comment._id}>Delete</button></span> <br>` +
                '<span class="comment-date">' +
                new Date(comment.createdAt).toLocaleDateString()
                + '    '
                +
                '<span class="comment-author">' +
                comment.username
                +
                '</span>' + '<span id="comment-id" hidden>' + comment._id + '</span>'

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

async function loadLikes() {
    const blogId = new URLSearchParams(window.location.search).get("id");

    try {
        const response = await fetch(`http://localhost:3000/api/like/get/${blogId}`);
        const likes = await response.json()

        const likesSection = document.querySelector(".likes-section");
        likesSection.innerHTML = "";

        const likesCount = document.getElementById("likes-count");
        likesCount.textContent = "Likes (" + likes.length + ")";


        likes.forEach(like => {
            const likeDiv = document.createElement("div");
            likeDiv.innerHTML =
                '<button class="btn delete-btn" id="deleteBlogBtn">Delete Like</button> <br>'
            likesSection.appendChild(likeDiv);
        });
    } catch (error) {
        console.error(error);
    }
}


async function deleteComment(commentId) {
    const confirmed = confirm('Are you sure you want to delete this blog?');

    if (confirmed) {

        try {
            const response = await fetch(`http://localhost:3000/api/comment/delete/${commentId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete blog');
            }

            alert('Blog deleted successfully!');

            //   window.location.href = '../pages/admin-blogs.html';
        } catch (error) {
            console.error('Error deleting blog:', error.message);
        }
    }
}



function delebuttons() {
    console.log('Am on buttons statement')

    let deleteButtons = document.querySelectorAll('.deleteCommentBtn');
    console.log('I selected the buttons: ', deleteButtons)
    // deleteButtons.forEach(deleteButton => {
    //     console.log('Adding event listener to delete button');
    //     deleteButton.addEventListener('click', function (event) {
    //         console.log('This is a delete button');
    //     })
    // })
}
