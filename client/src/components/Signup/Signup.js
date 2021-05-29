import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const validateEmail = (emailAdress) => {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  };

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = user;

    if (!validateEmail(email)) {
      toast.info("Invalid Email Format");
    } else {
      try {
        if (firstName && lastName && email && password) {
          const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              password,
            }),
          });

          const isRegistered = await response.json();

          console.log(isRegistered.message);

          if (isRegistered.message === "Registration Successfull") {
            toast.success("Registration Successfull!");
          } else {
            if (isRegistered.message === "Email already exists!")
              toast.error("Email already exists!");
          }
        } else {
          toast.dark("Fields are not properly filled!");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="signup">
      <section>
        <h1>Start living your work dream</h1>
        <aside className="top-aside">
          What do you want to do? (you can edit this later)
        </aside>
        <div className="category">
          <label id="left-label">
            <div>I WANT TO</div>
            <div>Work AS A FREELANCER</div>
          </label>
          <label id="right-label">
            <div>I WANT TO</div>
            <div>HIRE A FREELANCER</div>
          </label>
        </div>
        <form className="signup-form" method="POST">
          <div className="name-field">
            <input
              type="text"
              name="firstName"
              id="firstname"
              placeholder="First name"
              value={user.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              id="lastname"
              placeholder="Last name"
              value={user.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
          />

          <div className="btn-section">
            <div className="signup-btn">
              <button onClick={register}>SIGN UP</button>
              <a href="/">Back</a>
            </div>
          </div>
        </form>

        <aside className="policy">
          By signing up you accept PeoplePerHour’s Terms of Service and Privacy
          Policy. This site is protected by reCAPTCHA and the Google Privacy
          Policy and Terms of Service apply.
        </aside>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Signup;
