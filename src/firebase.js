import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { PasswordCheck } from "iconsax-react";
import toast from "react-hot-toast";


const firebaseConfig = {
  apiKey: "AIzaSyD7BRwLNnQQX8OXHg--5HonuVsq7xBw2Qo",
  authDomain: "auth-chat-d2b16.firebaseapp.com",
  projectId: "auth-chat-d2b16",
  storageBucket: "auth-chat-d2b16.appspot.com",
  messagingSenderId: "321019873104",
  appId: "1:321019873104:web:7f8badb206a53fec18ce55",
  measurementId: "G-GL65BES06P"

    // apiKey : process.env.API_KEY,
    // authDomain: process.env.AUTH_DOMAIN,
    // projectId : process.env.PROJECT_ID,
    // storageBucket : process.env.STORAGE_BUCKET,
    // messageSenderId : process.env.MESSAGE_SENDER_ID,
    // appId : process.env.APP_ID,
    // measurmentId : process.env.MEASURMENT_ID
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const register = async (email, password) =>{
        try{
        const {user} =  await createUserWithEmailAndPassword(auth, email, password);
        return user;
        }
        catch(e){
            toast.error(e.message);
        }
}

export const login = async (email,password) =>{
    try{
     const {user} =  await signInWithEmailAndPassword(auth, email, password);
     return user;
    } catch(e){
        toast.error(e.message);
    }
}

export const logout = async() =>{
    try{
        await signOut(auth);
        return true;
    }
    catch(e){
        toast.error(e.message);
    }
}

export default app;