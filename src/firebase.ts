// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
//import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAGLD_0aBved9lvy9J4dKfTqN9uETx-2Dg',
  authDomain: 'my-react-board.firebaseapp.com',
  projectId: 'my-react-board',
  storageBucket: 'my-react-board.firebasestorage.app',
  messagingSenderId: '419888205529',
  appId: '1:419888205529:web:0ac3a5b38ca98e3b90f8c8',
  measurementId: 'G-1X3JTK6QZE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
