import { useContext, useState, useEffect, createContext } from "react";
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { onAuthStateChanged, signOut, sendSignLinkToEmail, signInWithEmailLink } from 'firebase/auth'

const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
      appId: process.env.REACT_APP_FIREBASE_APPID,    
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  
    };

// firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_KEY,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
//     appId: process.env.REACT_APP_FIREBASE_APPID,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
// })

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
export const auth = getAuth(app);

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAuthenticating, setIsAuthenticating] = useState(true)

    function sendSignLinkToEmail(email){
        return sendSignLinkToEmail(auth, email, {
            url: 'http://localhost:3000/account',
            handleCodeInApp: true,
        }).then(() => {
            return true
        })
    };

    function signInWithEmailLink(email, code){
        return signInWithEmailLink(auth, email, code).then(result => {
            setUser(result.user);
            return true
        })
    };

    function logOut(){
        return signOut(auth).then(() => {
           setUser(null) 
        })
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            setIsAuthenticating(false)
        })

        return () => {
            unsubscribe()
        }
    },[]);

    // const values = {
    //     user, 
    //     sendSignLinkToEmail,
    //     signInWithEmailLink,
    //     logOut
    // }

    return (
        <AuthContext.Provider value={{user, sendSignLinkToEmail, signInWithEmailLink, logOut}}>
            {!isAuthenticating && children}
        </AuthContext.Provider>
    )
}