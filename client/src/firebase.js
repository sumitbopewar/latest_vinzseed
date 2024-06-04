// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAU9WeqlcgHBPPcG7vovFqnqSyrdMtjs5Q",
  authDomain: "vinzseeds.firebaseapp.com",
  projectId: "vinzseeds",
  storageBucket: "vinzseeds.appspot.com",
  messagingSenderId: "1010831768147",
  appId: "1:1010831768147:web:016b0daa30a12b6a4324a6",
  measurementId: "G-9QWPKME9R3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);