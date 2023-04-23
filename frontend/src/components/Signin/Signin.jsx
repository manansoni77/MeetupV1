/* eslint-disable no-restricted-globals */
import React, { useState } from "react";

export const Signin = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const fn = async () => {
    event.preventDefault();
    console.log("fn -> ", username, password);
    const res = await fetch("https://meetupv1-flask.onrender.com/signin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (res.status === 200) {
      console.log("successful");
    } else {
      console.log("failure");
    }
  };

  return (
    <>
      <div>Signin</div>
      <form onSubmit={fn}>
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
