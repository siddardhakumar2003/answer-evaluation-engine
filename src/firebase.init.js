// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC30OvMybgZujaD5itHIeaHidE48RyMFIg",
  authDomain: "answer-evaluation-engine.firebaseapp.com",
  projectId: "answer-evaluation-engine",
  storageBucket: "answer-evaluation-engine.appspot.com",
  messagingSenderId: "436820827946",
  appId: "1:436820827946:web:ebe2c234e1f7ade9ab4853",
  measurementId: "G-Q7MY22JKY1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {auth ,googleProvider} ;