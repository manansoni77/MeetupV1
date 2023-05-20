/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", null);
    localStorage.setItem("isSignedIn", false)
    navigate("/");
  });

  return <></>;
};
