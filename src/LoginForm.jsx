// LoginForm.js
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./form-styles.css";
function LoginForm() {
  const history = useHistory();

  // form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error messages
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // show/hide password
  const [showPassword, setShowPassword] = useState(false);

  const handleForm = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrEmail(
        !value.trim()
          ? "Email is required"
          : !emailRegex.test(value)
          ? "Invalid email format"
          : ""
      );
    }

    if (name === "password") {
      setPassword(value);
      setErrPassword(
        !value
          ? "Password is required"
          : value.length < 8
          ? "Password must be at least 8 characters"
          : ""
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // final validation check
    if (errEmail || errPassword || !email.trim() || !password) {
      alert("Please fix all errors before submitting.");
      return;
    }
     history.push("/home");
  };

  return ( <div className="form-container">
            <h2 className="form-title">Welcome Back</h2>
            <form onSubmit={handleSubmit} noValidate>
                {/* Email */}
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

                {/* Password */}
                <div className="mb-4">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={handleForm}
                            className={`form-control ${errPassword ? "is-invalid" : password ? "is-valid" : ""}`}
                            placeholder="Enter your password"
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

            
                {/* Submit */}
                <button
                    type="submit"
                    className="btn btn-primary btn-form w-100"
                    disabled={errEmail || errPassword || !email.trim() || !password}
                >
                    Login
                </button>

                <div className="text-center mt-3">
                    <a href="/register" className="form-link">Don't have an account? Register</a>
                </div>
            </form>
        </div>
    );
}
export default LoginForm;
