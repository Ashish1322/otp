// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCojS-HW75oJ_rX4IkumIdbFZ6V33SbZBU",
  authDomain: "student-pitch-desk.firebaseapp.com",
  databaseURL: "https://student-pitch-desk-default-rtdb.firebaseio.com",
  projectId: "student-pitch-desk",
  storageBucket: "student-pitch-desk.appspot.com",
  messagingSenderId: "205499781397",
  appId: "1:205499781397:web:b6d951d5b899694319191c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
