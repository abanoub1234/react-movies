import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./form-styles.css";
function RegisterForm() {
    const history = useHistory();

   
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    
    const [errName, setErrName] = useState("");
    const [errUsername, setErrUsername] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errConfirmPassword, setErrConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleForm = (e) => {
        const { name: field, value } = e.target;

        if (field === "name") {
            setName(value);
            setErrName(
                !value.trim() ? "Name is required" : ""
            );
        }
        else if (field === "username") {
            setUsername(value);
            setErrUsername(
                !value.trim() ? "Username is required" :
                /\s/.test(value) ? "Username must not contain spaces" : ""
            );
        }
        else if (field === "email") {
            setEmail(value);
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setErrEmail(
                !value.trim() ? "Email is required" :
                !emailRegex.test(value) ? "Invalid email format" : ""
            );
        }
        else if (field === "password") {
            setPassword(value);
            const pwdErr = 
                !value ? "Password is required" :
                value.length < 8 ? "Password must be at least 8 characters" :
                !/[a-z]/.test(value) ? "Must include at least one lowercase letter" :
                !/[A-Z]/.test(value) ? "Must include at least one uppercase letter" :
                !/\d/.test(value) ? "Must include at least one digit" :
                !/[@*%$#]/.test(value) ? "Must include at least one special character (@ * % $ #)" :
                "";
            setErrPassword(pwdErr);
           
            if (confirmPassword) {
                setErrConfirmPassword(
                    confirmPassword !== value ? "Passwords do not match" : ""
                );
            }
        }
        else if (field === "confirmPassword") {
            setConfirmPassword(value);
            setErrConfirmPassword(
                !value ? "Please confirm your password" :
                value !== password ? "Passwords do not match" : ""
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // final check
        if (
            errName || errUsername || errEmail || errPassword || errConfirmPassword ||
            !name.trim() || !username.trim() || !email.trim() || !password || !confirmPassword
        ) {
            alert("Please fix all errors before submitting.");
            return;
        }
       
        history.push("/login");
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Create Account</h2>
            <form onSubmit={handleSubmit} noValidate>

               
                <div className="mb-4">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleForm}
                        className={`form-control ${errName ? "is-invalid" : name ? "is-valid" : ""}`}
                        placeholder="Enter your full name"
                    />
                    {errName && <div className="invalid-feedback">{errName}</div>}
                </div>

                
                <div className="mb-4">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleForm}
                        className={`form-control ${errUsername ? "is-invalid" : username ? "is-valid" : ""}`}
                        placeholder="Choose a username"
                    />
                    {errUsername && <div className="invalid-feedback">{errUsername}</div>}
                </div>

               
                <div className="mb-4">
                    <label className="form-label">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleForm}
                        className={`form-control ${errEmail ? "is-invalid" : email ? "is-valid" : ""}`}
                        placeholder="your@email.com"
                    />
                    {errEmail && <div className="invalid-feedback">{errEmail}</div>}
                </div>

              
                <div className="mb-4">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleForm}
                            className={`form-control ${errPassword ? "is-invalid" : password ? "is-valid" : ""}`}
                            placeholder="At least 8 characters"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary input-group-text"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errPassword && <div className="invalid-feedback d-block">{errPassword}</div>}
                </div>

          
                <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleForm}
                        className={`form-control ${errConfirmPassword ? "is-invalid" : confirmPassword ? "is-valid" : ""}`}
                        placeholder="Re-enter your password"
                    />
                    {errConfirmPassword && <div className="invalid-feedback">{errConfirmPassword}</div>}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-form w-100"
                    disabled={
                        errName || errUsername || errEmail || errPassword || errConfirmPassword ||
                        !name || !username || !email || !password || !confirmPassword
                    }
                >
                    Register Now
                </button>

                <div className="text-center mt-3">
                    <a href="/login" className="form-link">Already have an account? Login</a>
                </div>
            </form>
        </div>
    );
}


export default RegisterForm;
