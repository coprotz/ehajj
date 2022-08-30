import { useContext, useState, useEffect, createContext } from "react";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, 
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase'


const userAuthContext = createContext();


export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState({})

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    function googleSignIn() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            currentUser?.getIdTokenResult().then(idTokenResult => {
                currentUser.admin = idTokenResult.claims;
            })
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        }
    },[])

    return (
        <userAuthContext.Provider value={{user, signUp, signIn, logOut, googleSignIn}}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext)
}