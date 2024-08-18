import { auth } from "./firebase.mjs";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
const btn2 = document.getElementById("btn");

btn2.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user ==== ", user);
      alert("Sign-In Successfully")
        window.location.href = "dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error code ===", errorCode);
      console.log("error message === ", errorMessage);
    });
});
