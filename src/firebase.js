import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


/* const firebaseConfig = {
  apiKey: "AIzaSyD6kcZWqCWR8mB2dT56fUSB9NKt1kyKyzA",
  authDomain: "son-chat-7b442.firebaseapp.com",
  projectId: "son-chat-7b442",
  storageBucket: "son-chat-7b442.appspot.com",
  messagingSenderId: "653093777765",
  appId: "1:653093777765:web:2f868907b42b6a3e91718c"
}; */

const firebaseConfig = {
  apiKey: "AIzaSyDbsHOgMmbA4pzbs2vHD52YYidMGIpBk8Y",
  authDomain: "chatto-af29b.firebaseapp.com",
  projectId: "chatto-af29b",
  storageBucket: "chatto-af29b.appspot.com",
  messagingSenderId: "625567700111",
  appId: "1:625567700111:web:bf5ee936d716d5a36f4cfa"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);


