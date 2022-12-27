import React, { useContext, useEffect, useState } from "react";
import "./Authentication.css";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/index";
import { noteContext } from "../../context/NoteProvider";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  pic: "",
};

const Authentication = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSignUp, setisSignUp] = useState(false);
  const navigate = useNavigate();

  const { user, setUser, setAlert } = useContext(noteContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));

    if (user) navigate("/diary");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      signUp();
    } else {
      signIn();
    }
  };

  const signUp = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.pic ||
      !formData.confirmPassword
    ) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setAlert({
        open: true,
        message: "Password do not match ",
        type: "error",
      });
      return;
    }
    try {
      const { data } = await api.signUp(formData);
      console.log(data);
      localStorage.setItem("profile", JSON.stringify(data));
      setUser(data);
      navigate("/diary");
      setAlert({
        open: true,
        message: `Signup In Successful. Welcome to Secrets`,
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error,
        type: "error",
      });
    }
    return;
  };

  const signIn = async () => {
    if (!formData.email || !formData.password) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        type: "error",
      });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await api.signIn(formData, config);
      localStorage.setItem("profile", JSON.stringify(data));
      setUser(data);
      navigate("/diary");
      setAlert({
        open: true,
        message: `Login In Successful. Welcome to Secrets`,
      });
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth">
      <div className="auth-gradient" />
      <div className="auth-form">
        <form className="auth-login" onSubmit={handleSubmit}>
          <h1>Secrets</h1>
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          )}
          {isSignUp && (
            <FileBase
              type="file"
              name="pic"
              multiple={false}
              onDone={({ base64 }) => setFormData({ ...formData, pic: base64 })}
            />
          )}
          <button type="submit" className="submit-btn">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <h4 className="switch-btn" onClick={() => setisSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account ? SignIn"
              : "Don't have an account ? SignUp"}
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
