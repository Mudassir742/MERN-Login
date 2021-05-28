import React, { useState } from "react";

import "./Signup.css";

const Signup = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  let name,value;
  const handleChange = (e) =>{
    name = e.target.name
    value = e.target.value

    setUser({...user,[name]:value})
  }

  const register = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password } = user;

    if (firstname && lastname && email && password) {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });

      const isRegistered = await response.json()

      if(isRegistered){
        alert(`Registration Successful`)
      }
      else{
        alert(`Oops! Something went wrong`)
      }

    } else {
      alert(`Fields are not properly filled!`);
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
              name="firstname"
              id="firstname"
              placeholder="First name"
              value={user.firstname}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last name"
              value={user.lastname}
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
    </div>
  );
};

export default Signup;
