// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgsuTMe5ksc1iBZIER2B-Vu2M1X7EIzT8",
  authDomain: "testprojectfortwitterchallenge.firebaseapp.com",
  projectId: "testprojectfortwitterchallenge",
  storageBucket: "testprojectfortwitterchallenge.appspot.com",
  messagingSenderId: "558212633611",
  appId: "1:558212633611:web:5a203301c53152c5b0e30e",
  measurementId: "G-PB8199LEH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 애널리틱스 지우면 작동 안함.

export const auth = getAuth(app);