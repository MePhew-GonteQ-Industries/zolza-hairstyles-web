import { initializeApp } from 'firebase/app';
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDD7fUs6hQ0wmc4DyDlSXEnqJVgb-8d92w",
  authDomain: "zolza-hairstyles.firebaseapp.com",
  projectId: "zolza-hairstyles",
  storageBucket: "zolza-hairstyles.appspot.com",
  messagingSenderId: "436999151575",
  appId: "1:436999151575:web:5998a5ea066c09d1c33592",
  measurementId: "G-JFC9R9LRXY"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export default getMessaging(app);
