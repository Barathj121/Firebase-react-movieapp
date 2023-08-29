// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVia28-OvX1H-CUw46ob4uYM3tPcam4H4",
  authDomain: "healthconnect-2.firebaseapp.com",
  projectId: "healthconnect-2",
  storageBucket: "healthconnect-2.appspot.com",
  messagingSenderId: "966130318984",
  appId: "1:966130318984:web:dce94427b0f5958760293d",
  measurementId: "G-PVWNSX6673"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleprovider=new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app);