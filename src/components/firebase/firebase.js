// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB9tuS5_tFlNxR6hKFNiJ6ID_8df6Bmn5s",
  authDomain: "netflix-3c68b.firebaseapp.com",
  projectId: "netflix-3c68b",
  storageBucket: "netflix-3c68b.appspot.com",
  messagingSenderId: "677867926576",
  appId: "1:677867926576:web:7e96067ab597f7c182a9f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const movieRef = collection(db,"movies")
export const reviewRef = collection(db,"reviews")

export default app