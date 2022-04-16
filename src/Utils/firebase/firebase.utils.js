import { initializeApp, } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDZiRefE3JsONLi1JH-f-xkIrWCtfwgmIQ",
    authDomain: "econupdate-9d56d.firebaseapp.com",
    projectId: "econupdate-9d56d",
    storageBucket: "econupdate-9d56d.appspot.com",
    messagingSenderId: "172086352858",
    appId: "1:172086352858:web:1f2bdf92929d1ef7d73ee3"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInfo={}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return createUserWithEmailAndPassword(auth, email, password)
}