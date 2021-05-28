import React, { useState } from "react";

import "./Signup.css";

const Signup = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  return (
    <div className="signup">
      <section>
        <h1>Start living your work dream</h1>
        <aside>What do you want to do? (you can edit this later)</aside>
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
        <form className="signup-form">
          <div className="name-field">
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First name"
              value={user.firstname}
            />
            <input
              type="text"
              name="lasttname"
              id="lastname"
              placeholder="Last name"
              value={user.lastname}
            />
          </div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={user.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={user.password}
          />

          <div className="btn-section">
            <div className="signup-btn">
              <button>SIGN UP</button>
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
