import { auth } from "./firebase.mjs";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
const btn2 = document.getElementById("btn");

btn2.addEventListener("click",async (e) => {
        e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
            alert("Sign-In Successfully");
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error("Error signing in:", error);
    }
});
