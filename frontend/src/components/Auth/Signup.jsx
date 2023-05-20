/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const fn = async () => {
    event.preventDefault();
    console.log("fn -> ", name, age);
    const res = await fetch("https://meetupv1-flask.onrender.com/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: age,
        username: username,
        password: password,
      }),
    });
    if (res.status === 200) {
      console.log("successful");
      const data = await res.json()
      localStorage.setItem('token', data.token)
      navigate("/");
    } else {
      console.log("failure");
    }
  };

  return (
    <>
      <div>Signup</div>
      <form onSubmit={fn}>
        <input
          type="text"
          placeholder="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="age"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
