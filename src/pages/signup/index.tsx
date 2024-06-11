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
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="sign-up">
        <Form.Label htmlFor="su_username">User Name</Form.Label>
        <Form.Control
          type="text"
          id="su_username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Label htmlFor="su_email">E-mail Address</Form.Label>
        <Form.Control
          type="text"
          id="su_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Label htmlFor="su_pwd">Password</Form.Label>
        <Form.Control
          type="password"
          id="su_pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Label htmlFor="su_pwd_confirm">Password Confirm</Form.Label>
        <Form.Control
          type="password"
          id="su_pwd_confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button
          variant="primary"
          className="w-100 mt-4 mb-4"
          size="lg"
          style={{
            height: "80px",
          }}
          onClick={doSignUp}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
