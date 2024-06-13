import axios from "axios";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [authResult, setAuthResult] = useState(true);

  const doSignIn = async () => {
    if(username.length === 0 || password.length ===0) {
      setValidated(true);
      return;
    }

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
        setAuthResult(false);
        console.log(error);
      });
  };

  const [validated, setValidated] = useState(false);


  return (
    <div className="d-flex justify-content-center align-items-center w-100 auth-panel">
      <div className="sign-up">
        <h1 className="__auth-title">Sign In</h1>
        
        <hr />

        <Form noValidate validated={validated} onSubmit={handleSubmit(doSignIn)}>
          <FormGroup>
            <Form.Control.Feedback type="invalid" className={`${authResult ? 'd-none' : 'd-block'}`}>Credentials is incorrect.</Form.Control.Feedback>
            <Form.Label htmlFor="su_username" className="form-label">User Name</Form.Label>
            <Form.Control
              required
              type="text"
              id="su_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User Name"
            />
            <Form.Control.Feedback type="invalid">Please fill User Name.</Form.Control.Feedback>
          </FormGroup>
          <FormGroup>
            <Form.Label htmlFor="su_pwd" className="form-label mt-4">Password</Form.Label>
            <Form.Control
              required
              type="password"
              id="su_pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">Please fill Password.</Form.Control.Feedback>
          </FormGroup>
          <Button
            variant="primary"
            className="w-100 mt-4 mb-4 auth-btn"
            size="lg"
            type="submit"
          >
            Sign In
          </Button>

          <Form.Text className="text-black">You don't have account, please <Link to="/sign-up" className="w-100 text-center">Sign Up</Link></Form.Text >
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
