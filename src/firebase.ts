import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyA5Hk4BFwXv96KR4y66GEaO-43T1lQwSf0",
    authDomain: "react-firebase-demo-e7054.firebaseapp.com",
    projectId: "react-firebase-demo-e7054",
    storageBucket: "react-firebase-demo-e7054.appspot.com",
    messagingSenderId: "425704270906",
    appId: "1:425704270906:web:3338c7f71e40d8eb085903",
    // storageBucket:"gs://react-firebase-demo-e7054.appspot.com/"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const db = getFirestore(app)

export {auth,db}