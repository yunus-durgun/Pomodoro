// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcyMYs9pBOj6nn_3pttgMW09dre-KeUbw",
  authDomain: "loginfirebase-27455.firebaseapp.com",
  databaseURL: "https://loginfirebase-27455-default-rtdb.firebaseio.com",
  projectId: "loginfirebase-27455",
  storageBucket: "loginfirebase-27455.firebasestorage.app",
  messagingSenderId: "2219389435",
  appId: "1:2219389435:web:c699bcc02f94055e2a5b5e",
  measurementId: "G-9MM8HNBJ01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics in web environments
let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
}

export default app;