import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, updateEmail, GoogleAuthProvider} from "firebase/auth";
import { PasswordCheck } from "iconsax-react";
import toast from "react-hot-toast";
import store from "./store";
import { loginCheck, logoutCheck } from "./store/auth";
import { getFirestore , collection, addDoc, doc, setDoc} from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

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

export const updateUser = async (info) =>{
    try {
        await updateProfile(auth.currentUser,info)
    }
    catch(e){
        toast.error(e.message);
    }
}

export const changeEmail = async(info) =>{
    try{
        await updateEmail(auth.currentUser, info)
    }
    catch(e){
        toast.error(e.message);
    }
}

onAuthStateChanged(auth, (user) =>{
    if(user){
        store.dispatch(loginCheck({
            displayName : user.displayName,
            email: user.email,
            photoURL : user.photoURL,
            uid: user.uid,
        }));
    }else{
        store.dispatch(logoutCheck);
    }
})

export default app;