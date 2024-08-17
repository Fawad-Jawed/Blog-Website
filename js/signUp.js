import { auth } from "./firebase.mjs";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const btn1 = document.getElementById("btn");

btn1.addEventListener("click", () => {
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user ==== ", user);
      alert("Account Created Successfully")
      window.location.href="signIn.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error code ===", errorCode);
      console.log("error message === ", errorMessage);
    });
});