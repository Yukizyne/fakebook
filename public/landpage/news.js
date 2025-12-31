document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");

  
    if (!currentUser && window.location.pathname.includes("newsfeed.html")) {
        alert("Please login first!");
        window.location.href = "../login/logreg.html";
        return; // stop execution
    }

    // POSTING
    const postInput = document.getElementById("post-input");
    const postBtn = document.getElementById("post-btn");
    const postsContainer = document.getElementById("posts-container");

    if (postBtn) {
        postBtn.addEventListener("click", () => {
            const text = postInput.value.trim();
            if (!text) return;

            const post = document.createElement("div");
            post.classList.add("post");
            post.innerHTML = `
                <div class="post-header">
                    <span>${currentUser || "User"}</span>
                    <button class="delete-post">Delete</button>
                </div>
                <p>${text}</p>
                <div class="post-action">
                    <span class="like-btn">Like</span>
                    <span class="comment-btn">Comment</span>
                    <span class="share-btn">Share</span>
                </div>
                <div class="comments-container"></div>
            `;
            postsContainer.prepend(post);
            postInput.value = "";

            // Delete
            post.querySelector(".delete-post").addEventListener("click", () => post.remove());

            // Like
            const likeBtn = post.querySelector(".like-btn");
            likeBtn.addEventListener("click", () => likeBtn.classList.toggle("liked"));

            // Comment
            const commentBtn = post.querySelector(".comment-btn");
            const commentsContainer = post.querySelector(".comments-container");
            commentBtn.addEventListener("click", () => {
                const commentText = prompt("Enter your comment:");
                if (commentText) {
                    const comment = document.createElement("div");
                    comment.classList.add("comment");
                    comment.textContent = `${currentUser || "User"}: ${commentText}`;
                    commentsContainer.appendChild(comment);
                }
            });

            // Share
            const shareBtn = post.querySelector(".share-btn");
            shareBtn.addEventListener("click", () => alert("Post shared!"));
        });
    }

    // SEARCH USERS
    const searchInput = document.querySelector(".search-bar input");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const filter = searchInput.value.toLowerCase();
            document.querySelectorAll(".contacts ul li").forEach(li => {
                const name = li.querySelector(".contact-name").textContent.toLowerCase();
                li.style.display = name.includes(filter) ? "" : "none";
            });
        });
    }

    // LOGOUT FUNCTION
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser"); 
            alert("You have logged out!");
            window.location.href = "../login/logreg.html";
        });
    }
});
