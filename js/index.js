import { renderBlogs } from "./dashboard.js";

// Function to fetch blogs (you should replace this with your actual data fetching logic)
async function fetchBlogs() {
    // Mock data for demonstration purposes
    return [
        { id: "1", title: "Sample Blog 1", body: "This is a sample blog.", date: new Date() },
        { id: "2", title: "Sample Blog 2", body: "This is another sample blog.", date: new Date() }
    ];
}

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

