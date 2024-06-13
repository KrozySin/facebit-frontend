import { Button, Form, FormGroup, Image } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { handleSubmit } = useForm();

  const doSignUp = async () => {
    if(username.length === 0 || password.length === 0 || email.length === 0 || passwordConfirm.length === 0) {
      setValidated(true);
      return;
    }

    if (password !== passwordConfirm) {
      setValidated(true);
      return;
    }

    axios.post("http://192.168.6.244:4000/user/register", {
      username,
      password,
      email,
    });
  };

  const [validated, setValidated] = useState(false);

  return (
    <div className="d-flex justify-content-center align-items-center w-100 auth-panel">
      <div className="sign-up">

        <div className="logo-div">
          <Image src="./Logo.svg" className="auth-logo" alt="Logo"/>
        </div>

        <h2 className="__auth-title">Sign Up</h2>

        <hr />

        <Form noValidate validated={validated} onSubmit={handleSubmit(doSignUp)}>
          <FormGroup>
            <Form.Label htmlFor="su_username" className="form-label">User Name</Form.Label>
            <Form.Control
              required
              type="text"
              id="su_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Jackson"
            />
            <Form.Control.Feedback type="invalid">Please fill User Name.</Form.Control.Feedback>
          </FormGroup>

          <FormGroup>
            <Form.Label htmlFor="su_email" className="mt-4">Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              id="su_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="face@bit.com"
            />
            <Form.Control.Feedback type="invalid">Please fill Email Address.</Form.Control.Feedback>
          </FormGroup>

        <FormGroup>
          <Form.Label htmlFor="su_pwd" className="mt-4">Password</Form.Label>
          <Form.Control
            required
            type="password"
            id="su_pwd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
          <Form.Control.Feedback type="invalid">Please fill Password.</Form.Control.Feedback>
          {/* <Form.Control.Feedback type="invalid">Don't match password and confirm.</Form.Control.Feedback> */}
        </FormGroup>

        <FormGroup>
          <Form.Label htmlFor="su_pwd_confirm" className="mt-4">Password Confirm</Form.Label>
          <Form.Control
            required
            type="password"
            id="su_pwd_confirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="******"
          />
          <Form.Control.Feedback type="invalid">Please fill Password Confirm.</Form.Control.Feedback>
        </FormGroup>

        <Button
          variant="primary"
          className="w-100 mt-4 mb-4 auth-btn"
          size="lg"
          type="submit"
        >
          Sign Up
        </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
