import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const doSignUp = async () => {
    if (password !== passwordConfirm) return;
    axios.post("http://192.168.6.244:4000/user/register", {
      username,
      password,
      email,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 auth-panel">
      <div className="sign-up">
        <h1 className="__auth-title">Sign Up</h1>

        <hr />

        <Form.Label htmlFor="su_username" className="form-label">User Name</Form.Label>
        <Form.Control
          type="text"
          id="su_username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
          placeholder="Jackson"
        />
        <Form.Label htmlFor="su_email" className="mt-4">Email Address</Form.Label>
        <Form.Control
          type="text"
          id="su_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="face@bit.com"
        />
        <Form.Label htmlFor="su_pwd" className="mt-4">Password</Form.Label>
        <Form.Control
          type="password"
          id="su_pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
        />
        <Form.Label htmlFor="su_pwd_confirm" className="mt-4">Password Confirm</Form.Label>
        <Form.Control
          type="password"
          id="su_pwd_confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="******"
        />
        <Button
          variant="primary"
          className="w-100 mt-4 mb-4 auth-btn"
          size="lg"
          onClick={doSignUp}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
