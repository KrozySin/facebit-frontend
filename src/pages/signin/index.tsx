import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doSignIn = async () => {
    axios
      .post("http://192.168.6.244:4000/user/login", {
        username,
        password,
      })
      .then((result) => {
        window.localStorage.setItem("token", result.data.access_token);
        window.localStorage.setItem("user", JSON.stringify(result.data.user));
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 auth-panel">
      <div className="sign-up">
        <h1 className="__auth-title">Sign In</h1>

        <hr />

        <Form.Label htmlFor="su_username" className="form-label">User Name</Form.Label>
        <Form.Control
          type="text"
          id="su_username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="UserName"
        />
        <Form.Label htmlFor="su_pwd" className="form-label mt-4">Password</Form.Label>
        <Form.Control
          type="password"
          id="su_pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button
          variant="primary"
          className="w-100 mt-4 mb-4 auth-btn"
          size="lg"
          onClick={doSignIn}
        >
          Sign In
        </Button>

        <label className="text-black">You don't have account, please <Link to="/sign-up" className="w-100 text-center">Sign Up</Link></label>
      </div>
    </div>
  );
};

export default SignIn;
