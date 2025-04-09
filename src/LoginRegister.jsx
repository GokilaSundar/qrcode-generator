import axios from "axios";
import { useState } from "react";

export const LoginRegister = ({ setUser }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  return (
    <>
      <fieldset>
        <legend>Login</legend>
        <label>
          Email:
          <input
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            axios
              .post("/api/login", {
                email: loginEmail,
                password: loginPassword,
              })
              .then((response) => {
                setUser(response.data);
              })
              .catch((error) => {
                console.error("Login failed:", error);
                alert("Login failed.");
              });
          }}
        >
          Login
        </button>
      </fieldset>
      <fieldset>
        <legend>Register</legend>
        <label>
          Name:
          <input
            type="text"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            axios
              .post("/api/register", {
                name: registerName,
                email: registerEmail,
                password: registerPassword,
              })
              .then(() => {
                alert("Registration successful!");

                setRegisterName("");
                setRegisterEmail("");
                setRegisterPassword("");
              })
              .catch((error) => {
                console.error("Registration failed:", error);
                alert("Registration failed.");
              });
          }}
        >
          Register
        </button>
      </fieldset>
    </>
  );
};
