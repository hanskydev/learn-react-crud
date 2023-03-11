import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

// PrimeReact
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { signin } = useAuth();

    const isValidForm = () => {
        return username.length > 0 && password.length > 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signin(username, password);
        } catch (error) {
            setError(true);
            setErrorMessage("Failed to sign in. Please check your credentials.");
        }
    };

    return (
        <div className="login-panel shadow-8 p-fluid">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <p>Masukkan username dan password anda.</p>

                {error && <Message className="mb-2" severity="error" text={errorMessage} />}

                <div className="mb-2">
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                </div>

                <div className="mb-2">
                    <Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        toggleMask
                        feedback={false}
                        placeholder="Password"
                    />
                </div>

                <div className="mb-2">
                    <Button type="submit" disabled={!isValidForm()}>
                        Sign In
                    </Button>
                </div>

                <div>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default Signin;
