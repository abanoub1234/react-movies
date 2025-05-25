import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./form-styles.css"; // you can keep your existing styles or add more

function RegisterForm() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: `${capitalize(name)} is required` }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const key in formData) {
      if (!formData[key].trim()) {
        newErrors[key] = `${capitalize(key)} is required`;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    history.push("/login");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Account</h2>
      <form onSubmit={handleSubmit} noValidate style={styles.form}>
        {["name", "username", "email", "password", "confirmPassword"].map((field) => (
          <div key={field} style={styles.inputGroup}>
            <label style={styles.label}>{capitalize(field)}</label>
            <input
              type={field.toLowerCase().includes("password") ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: errors[field] ? "#e74c3c" : "#ccc",
                backgroundColor: errors[field] ? "#fdecea" : "white",
              }}
              placeholder={`Enter your ${field === "confirmPassword" ? "password again" : field}`}
            />
            {errors[field] && <small style={styles.error}>{errors[field]}</small>}
          </div>
        ))}

        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          style={{
            ...styles.button,
            backgroundColor: Object.keys(errors).length > 0 ? "#ccc" : "#3498db",
            cursor: Object.keys(errors).length > 0 ? "not-allowed" : "pointer",
          }}
        >
          Register Now
        </button>
      </form>
      <div style={styles.loginLink}>
        <a href="/login" style={{ color: "#3498db", textDecoration: "none" }}>
          Already have an account? Login
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: 8,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    display: "block",
    marginBottom: 6,
    color: "#555",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: 16,
    borderRadius: 4,
    border: "1.5px solid #ccc",
    transition: "border-color 0.3s",
    outline: "none",
  },
  error: {
    color: "#e74c3c",
    marginTop: 4,
    fontSize: 13,
  },
  button: {
    padding: "12px",
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    transition: "background-color 0.3s",
  },
  loginLink: {
    marginTop: 20,
    textAlign: "center",
  },
};

export default RegisterForm;
