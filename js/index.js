import { renderBlogs } from "./dashboard.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { db } from './firebase.mjs'; // Ensure you import your Firestore instance

// Function to fetch blogs from Firestore
async function fetchBlogs() {
    try {
        const blogsCollection = collection(db, 'blogs');
        const querySnapshot = await getDocs(blogsCollection);
        const blogs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return blogs;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return []; // Return an empty array if there's an error
    }
}

// Function to load and render blogs
async function loadBlogs() {
    try {
        const blogs = await fetchBlogs();
        const blogsContainer = document.getElementById('blogsContainer');
        renderBlogs(blogs, blogsContainer);
    } catch (error) {
        console.error('Error loading blogs:', error);
    }
}

// Set heading based on time of day
const heading = document.getElementById("head");
const currentHour = new Date().getHours();

if (currentHour < 12) {
    heading.innerText = "Good Morning Readers!";
} else {
    heading.innerText = "Good Afternoon Readers!";
}

// Load blogs when the page loads
loadBlogs();

































// // import {renderBlogs} from "./dashboard.js"
// // renderBlogs()
// const heading = document.getElementById("head")
// if (0 >=24) {
//     heading.innerText="Good Morning Readers !"
// }else{
//         heading.innerText="Good Afternoon Readers !"
// }

