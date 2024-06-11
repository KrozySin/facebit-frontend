import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
    <div className="d-flex justify-content-center align-items-center w-100">
      <div className="sign-up">
        <Form.Label htmlFor="su_username">User Name</Form.Label>
        <Form.Control
          type="text"
          id="su_username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Label htmlFor="su_pwd">Password</Form.Label>
        <Form.Control
          type="password"
          id="su_pwd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="primary"
          className="w-100 mt-4 mb-4"
          size="lg"
          style={{
            height: "80px",
          }}
          onClick={doSignIn}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
