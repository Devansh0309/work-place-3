import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArZAtYb2byIyFqdbIU6AM4wV_yE4b-sBQ",
  authDomain: "work-place-4ef05.firebaseapp.com",
  projectId: "work-place-4ef05",
  storageBucket: "work-place-4ef05.appspot.com",
  messagingSenderId: "836019516045",
  appId: "1:836019516045:web:07a655eef0df7cf6fc68c4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);