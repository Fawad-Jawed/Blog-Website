// import {renderBlogs} from "./dashboard.js"
// renderBlogs()
const heading = document.getElementById("head");
const currentHour = new Date().getHours();

if (currentHour < 12) {
  heading.innerText = "Good Morning Readers!";
} else {
  heading.innerText = "Good Afternoon Readers!";
}
