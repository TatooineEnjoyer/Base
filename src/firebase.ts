// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Функция для регистрации
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    throw new Error(error.message);
  }
};

import { signInWithEmailAndPassword } from "firebase/auth";

// Функция для входа
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    throw new Error(error.message);
  }
};

import { signOut } from "firebase/auth";

// Функция для выхода
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error: any) {
    console.error("Error logging out:", error.message);
  }
};

import { onAuthStateChanged } from "firebase/auth";

export const observeAuthState = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};