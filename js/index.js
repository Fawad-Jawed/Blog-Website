document.getElementById('newBlogForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    try {
        await addDoc(collection(db, 'blogs'), {
            title,
            body,
            date: new Date(),
            userId: auth.currentUser.uid
        });
        document.getElementById('newBlogForm').reset();
        // Redirect to index.html
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
    }
});














// import {renderBlogs} from "./dashboard.js"
// renderBlogs()
// const heading = document.getElementById("head");
// const currentHour = new Date().getHours();

// if (currentHour < 12) {
//   heading.innerText = "Good Morning Readers!";
// } else {
//   heading.innerText = "Good Afternoon Readers!";
// }
