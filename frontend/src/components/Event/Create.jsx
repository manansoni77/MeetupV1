/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputText } from "../components/form";

export const CreateEvent = () => {
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();

  const navigate = useNavigate();

  const fn = async () => {
    event.preventDefault();
    console.log("fn -> ", title, location);
    const res = await fetch("https://meetupv1-flask.onrender.com/register/event", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        location: location,
      }),
    });
    if (res.status === 200) {
      console.log("successful");
      navigate("/events");
    } else {
      console.log("failure");
    }
  };

  return (
    <>
      <div>Create Event</div>
      <Form onSubmit={fn}>
        <InputText
          placeholder="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <InputText
          placeholder="location"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};
