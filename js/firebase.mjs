import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQM3tHDArduODlJhaZk4-FqD17QH01_9g",
  authDomain: "blog-website-799a1.firebaseapp.com",
  projectId: "blog-website-799a1",
  storageBucket: "blog-website-799a1.appspot.com",
  messagingSenderId: "36515951369",
  appId: "1:36515951369:web:f8107122577f7836b699d8",
  measurementId: "G-LWK5C27QK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);