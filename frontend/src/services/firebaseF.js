// frontend/src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAnpJSgor8TKWPklnKWXd22Bvk7uRvyrik",
    authDomain: "insight-news-8d50f.firebaseapp.com",
    projectId: "insight-news-8d50f",
    storageBucket: "insight-news-8d50f.appspot.com",
    messagingSenderId: "631625233617",
    appId: "1:631625233617:web:1280f485ac962e303d41f0",
    measurementId: "G-FMFPKJE465"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };