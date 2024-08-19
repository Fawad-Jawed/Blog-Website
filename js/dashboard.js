// Import necessary functions from Firebase libraries
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';
import { auth, db } from './firebase.mjs';

// Get references to DOM elements
const blogsContainer = document.getElementById('blogsContainer');
const editBlogModal = document.getElementById('editBlogModal');
const editBlogForm = document.getElementById('editBlogForm');
const editBlogId = document.getElementById('editBlogId');
const editTitle = document.getElementById('editTitle');
const editBody = document.getElementById('editBody');

// Expose the function to show the edit blog modal
window.showEditBlogModal = function(id, title, body) {
    editBlogId.value = id;
    editTitle.value = title;
    editBody.value = body;
    editBlogModal.classList.remove('hidden');
};

// Expose the function to delete a blog
window.deleteBlog = async function(id) {
    try {
        // Delete the blog document from Firestore
        await deleteDoc(doc(db, 'blogs', id));
    } catch (error) {
        console.error("Error deleting blog: ", error); // Log any errors
    }
};

// Function to render blogs
export function renderBlogs(blogs) {
    blogsContainer.innerHTML = ''; // Clear the existing blogs
    blogs.forEach(blog => {
        // Create a new div for each blog
        const blogDiv = document.createElement('div');
        blogDiv.className = 'bg-gray-50 p-4 rounded-lg shadow-md mb-5';
        // Set the inner HTML of the blog div
        blogDiv.innerHTML = `
            <h3 class="text-lg font-semibold">${blog.title}</h3>
            <p class="mt-2">${blog.body}</p>
            <small class="block mt-2 text-gray-500">${blog.date.toDate().toLocaleString()}</small>
            <div class="mt-4 flex space-x-2">
                <button onclick="deleteBlog('${blog.id}')" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                <button onclick="showEditBlogModal('${blog.id}', '${blog.title}', '${blog.body}')" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit</button>
            </div>
        `;
        // Append the new blog div to the blogs container
        blogsContainer.appendChild(blogDiv);
    });
}

// Event listener for the edit blog form submission
editBlogForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const id = editBlogId.value; // Get the blog ID
    const title = editTitle.value; // Get the updated title
    const body = editBody.value; // Get the updated body

    try {
        // Update the blog document in Firestore
        await updateDoc(doc(db, 'blogs', id), {
            title,
            body
        });
        editBlogModal.classList.add('hidden'); // Hide the edit modal
    } catch (error) {
        console.error("Error updating blog: ", error); // Log any errors
    }
});

// Monitor authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // If user is authenticated, fetch and render blogs
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            const blogs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            renderBlogs(blogs); // Render the blogs
        });
    } else {
        // If user is not authenticated, redirect to sign-in page
        window.location.href = "signIn.html";
    }
});

// Event listener for the new blog form submission
document.getElementById('newBlogForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('title').value; // Get the blog title
    const body = document.getElementById('body').value; // Get the blog body

    try {
        // Add a new blog document to Firestore
        await addDoc(collection(db, 'blogs'), {
            title,
            body,
            date: new Date(), // Set the current date
            userId: auth.currentUser.uid // Set the current user's ID
        });
        document.getElementById('newBlogForm').reset(); // Reset the form fields
    } catch (error) {
        console.error("Error adding blog: ", error); // Log any errors
    }
});

// Event listener for signing out the user
const signOutUser = document.querySelector("#sign-out");
signOutUser.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default button action
    signOut(auth).then(() => {
        window.location.href = "signIn.html"; // Redirect to sign-in page
    }).catch((error) => {
        alert("Error signing out: ", error); // Show an error alert if sign out fails
    });
});
