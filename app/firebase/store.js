// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSFPfAlBHm-G-Gw_sH64pwThUfTeGdIIc",
  authDomain: "pasteey-b5b6c.firebaseapp.com",
  projectId: "pasteey-b5b6c",
  storageBucket: "pasteey-b5b6c.appspot.com",
  messagingSenderId: "1005817921489",
  appId: "1:1005817921489:web:fdd58cbfc177231b772af0",
  measurementId: "G-GCW2W4ZFJB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);


export const auth = getAuth();


export default app