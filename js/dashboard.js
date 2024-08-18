import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';
import { auth, db } from './firebase.mjs';

const blogsContainer = document.getElementById('blogsContainer');

export function renderBlogs(blogs) {
  blogsContainer.innerHTML = "";
  blogs.forEach((blog) => {
    const blogDiv = document.createElement("div");
    blogDiv.className = "bg-gray-50 p-4 rounded-lg shadow-md mb-5";
    blogDiv.innerHTML = `
            <h3 class="text-lg font-bold">${blog.title}</h3>
            <p class="text-justify">${blog.body}</p>
            <small class="block mt-2 text-gray-500">${blog.date
              .toDate()
              .toLocaleString()}</small>
            <div class="mt-4 flex space-x-2">
                <button data-id="${
                  blog.id
                }" class="delete-blog bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
            </div>
        `;
    blogsContainer.appendChild(blogDiv);
  });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            const blogs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            renderBlogs(blogs);
        });
    } else {
        window.location.href="index.html";
    }
});

document.getElementById('newBlogForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    if (auth.currentUser) {
        await addDoc(collection(db, 'blogs'), {
            title,
            body,
            date: new Date(),
            userId: auth.currentUser.uid
        });

        window.location.reload();
    }
});

document.deleteBlog = async (id) => {
    try {
        await deleteDoc(doc(db, 'blogs', id));
    } catch (error) {
        console.error(error);
    }
};

// For Signing Out User
const signOutUser = document.querySelector("#sign-out");
signOutUser.addEventListener("click", (event) => {
    event.preventDefault();
    signOut(auth).then(() => {
        window.location.href="index.html";
    }).catch((error) => {
        alert(error);
    });
})
