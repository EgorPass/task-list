// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore, setDoc, getDocs, addDoc, doc, collection } from 'firebase/firestore';

import { getDatabase } from "firebase/database"

import {getStorage, ref, uploadString, uploadBytesResumable} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDBvcAAUkF6Rz3Kkvq0BgUN0FIgHDMr9LM",
  authDomain: "womenup-8ade4.firebaseapp.com",
  projectId: "womenup-8ade4",
  storageBucket: "womenup-8ade4.appspot.com",
  messagingSenderId: "169286984513",
	appId: "1:169286984513:web:f0540697c9c3e07c9737c0",
	databaseURL: "https://womenup-8ade4-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
getDatabase(app)
getStorage(app)


async function run() {
	const storage = ref(getStorage(), "src/hello.txt")
	const str = "Hello storage, with param"
	// const uploadTask =
		uploadString(storage, str).then (()=>alert("ok"))
	
	
}

// run();



