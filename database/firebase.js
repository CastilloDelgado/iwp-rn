import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQbIZ3pKhy1e1yVeWvWKujiNk-vg-iuP0",
  authDomain: "react-native-fire-5bc91.firebaseapp.com",
  projectId: "react-native-fire-5bc91",
  storageBucket: "react-native-fire-5bc91.appspot.com",
  messagingSenderId: "285580519798",
  appId: "1:285580519798:web:59839e4cccaca636d3f257",
  measurementId: "G-S240EF0J0Z",
};

const fb = initializeApp(firebaseConfig);
export const db = getFirestore(fb);
