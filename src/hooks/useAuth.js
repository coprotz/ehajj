import { useContext, useState, useEffect, createContext } from "react";
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database";
import {  getMessaging, getToken, onMessage } from 'firebase/messaging'
import { 
    onAuthStateChanged, 
    signOut, 
    signInWithEmailLink, 
    signInWithEmailAndPassword,
    getAuth,
    sendSignInLinkToEmail, 
    isSignInWithEmailLink,
    createUserWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
      appId: process.env.REACT_APP_FIREBASE_APPID,    
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  
    };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app)

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

// export function onMessage

export const onMessageHandler = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

// export const getToken = (setTokenFound) => {
//     return getToken(messaging, {vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
//       if (currentToken) {
//         console.log('current token for client: ', currentToken);
//         setTokenFound(true);
       
//       } else {
//         console.log('No registration token available. Request permission to generate one.');
//         setTokenFound(false);
  
//       }
//     }).catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
  
//     });
//   }

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAuthenticating, setIsAuthenticating] = useState(true)

    const sendLink = (email) =>{
        return sendSignInLinkToEmail(auth, email, {
            url: 'http://localhost:3000/account',
            handleCodeInApp: true,
        }).then(() => {
            return true
        })
    };

    function signIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function isSign(email){
        return isSignInWithEmailLink(auth, email).then(() => {
            return true
        })
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

      function logOut(){
        return signOut(auth)
      }

 
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
        <AuthContext.Provider value={{user, db, sendLink, signIn, logOut, isSign, signUp }}>
            {!isAuthenticating && children}
        </AuthContext.Provider>
    )
}