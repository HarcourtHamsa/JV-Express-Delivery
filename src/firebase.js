import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTjOuRx0SwWcVTlQjew7dCuQCVY47ugMc",
  authDomain: "jve-delivery-company.firebaseapp.com",
  projectId: "jve-delivery-company",
  storageBucket: "jve-delivery-company.appspot.com",
  messagingSenderId: "888479024477",
  appId: "1:888479024477:web:c1ee5e85a708bfc46d94b4",
  measurementId: "G-DZ29J6RFF9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
