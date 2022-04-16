import { useEffect } from 'react';
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../Utils/firebase/firebase.utils';
import { getRedirectResult } from 'firebase/auth'
import SignUpForm from '../../components/sign-up-form/sign-up-form-component';

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };


    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;
