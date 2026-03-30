import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = async () => {
  //   try {
  //     const res = await login(form);
  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("role", res.data.role);
  //     localStorage.setItem("username", res.data.username);
  //     navigate(res.data.role === "ADMIN" ? "/admin" : "/student");
  //   } catch {
  //     setError("Invalid username or password");
  //   }
  // };
  const handleSubmit = async () => {
    try {
      const res = await login(form);
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);
      
      if (res.data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/student";
      }
    } catch (err) {
      console.log("Login error:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎓 Smart Student MS</h2>
        <p style={styles.subtitle}>Sign in to your account</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Username"
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button style={styles.button} onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex", justifyContent: "center",
    alignItems: "center", height: "100vh", background: "#f0f4f8"
  },
  card: {
    background: "#fff", padding: "40px", borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "360px"
  },
  title: { textAlign: "center", color: "#1a237e", marginBottom: "8px" },
  subtitle: { textAlign: "center", color: "#666", marginBottom: "24px" },
  input: {
    width: "100%", padding: "12px", marginBottom: "16px",
    border: "1px solid #ddd", borderRadius: "8px",
    fontSize: "14px", boxSizing: "border-box"
  },
  button: {
    width: "100%", padding: "12px", background: "#1a237e",
    color: "#fff", border: "none", borderRadius: "8px",
    fontSize: "16px", cursor: "pointer"
  },
  error: { color: "red", textAlign: "center", marginBottom: "12px" }
};