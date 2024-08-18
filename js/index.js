// import { renderBlogs } from "./dashboard.js";
// import { collection, query, orderBy, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';
// import { db } from './firebase.mjs';

// const blogsContainer = document.getElementById('blogsContainer');

// const q = query(collection(db, 'blogs'), orderBy('date', 'desc'));
// onSnapshot(q, (querySnapshot) => {
//     const blogs = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//     }));
//     renderBlogs(blogs);
// });

const heading = document.getElementById("head");
const currentHour = new Date().getHours();

if (currentHour < 12) {
    heading.innerText = "Good Morning Readers!";
} else {
    heading.innerText = "Good Afternoon Readers!";
}















// import {renderBlogs} from "./dashboard.js"
// renderBlogs()
// const heading = document.getElementById("head");
// const currentHour = new Date().getHours();

// if (currentHour < 12) {
//   heading.innerText = "Good Morning Readers!";
// } else {
//   heading.innerText = "Good Afternoon Readers!";
// }
