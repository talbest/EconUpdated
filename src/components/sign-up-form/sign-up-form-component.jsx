import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../Utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";
const deafultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(deafultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });

    }
    const resetFormFields = () => {
        setFormFields(deafultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields()

        } catch (err) {
            console.log("user creation occure an error ", err)
        }

    }
    return (
        <div className="sign-up-container">
            <h2>dont have an acount</h2>
            <span>Sign up with your email and password </span>
            <form onSubmit={(event) => { handleSubmit(event) }}>

                <FormInput required type="text" onChange={handleChange} name="displayName" value={displayName} label="Display Name" />

                <FormInput required type="email" onChange={handleChange} name="email" value={email} label="Email" />

                <FormInput required type="password" onChange={handleChange} name="password" value={password} label="Password" />

                <FormInput required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} label="Condfirm password" />
                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}
export default SignUpForm;