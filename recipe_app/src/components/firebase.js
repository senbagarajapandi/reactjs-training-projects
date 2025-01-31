import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBIBQV78COp6ZOZpiBmyyREWZWItmXtz94",
    authDomain: "recipe-app-training.firebaseapp.com",
    projectId: "recipe-app-training",
    storageBucket: "recipe-app-training.firebasestorage.app",
    messagingSenderId: "1009358755070",
    appId: "1:1009358755070:web:7b3d566c43fc67640e01af"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };