import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4FNhg84Bxur-JGA-aJAcyKxaxN9zwQ-Y",
  authDomain: "myproject-100ff.firebaseapp.com",
  projectId: "myproject-100ff",
  storageBucket: "myproject-100ff.firebasestorage.app",
  messagingSenderId: "1042078745117",
  appId: "1:1042078745117:web:a16804e6846b3c93fdbcf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


// Регистрация
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw new Error(error.message);
  }
};

// Вход
export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw new Error(error.message);
  }
};

// Выход
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

// Отслеживание состояния
export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? user : null);
  });
};

import { collection, addDoc, onSnapshot } from "firebase/firestore";

// добавить комментарий
export const addComment = async (text) => {
  try {
    await addDoc(collection(db, "comments"), {
      text,
      createdAt: Date.now()
    });
  } catch (e) {
    console.error("Error adding comment: ", e);
  }
};

// подписка на изменения
export const subscribeToComments = (callback) => {
  return onSnapshot(collection(db, "comments"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};
