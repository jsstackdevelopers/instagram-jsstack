import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA90BUDoMmC0eMnPmOEb1j_WpHeIk-_zo4",
    authDomain: "instagram-js-7ff35.firebaseapp.com",
    projectId: "instagram-js-7ff35",
    storageBucket: "instagram-js-7ff35.appspot.com",
    messagingSenderId: "992562180457",
    appId: "1:992562180457:web:41d84396a774721d644df8"
};

// Initialize Firebase
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth(firebaseApp);

export { db, storage, auth };