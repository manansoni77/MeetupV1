import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const NavItem = ({ link, description }) => {
  return (
    <div className="w-[96px] h-[32px] font-mono bg-[#D9D9D9] flex items-center justify-center">
      <a className="text-[16px]" href={link}>{description}</a>
    </div>
  );
};

export const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    console.log(localStorage.getItem("token") !== "null");
    if (localStorage.getItem("token") !== "null") {
      setIsSignedIn(true);
    }
  }, [location]);
  return (
    <>
      <div className="w-[1360px] h-[48px] px-[8px] py-[8px] flex justify-between bg-[#FFFFFF]">
        <div className="w-[308px] h-[32px] text-[24px] flex items-center justify-center font-mono bg-[#D9D9D9]">Meetup V1</div>
        <div className="flex gap-[16px]">
          <NavItem link="/about" description="ABOUT" />
          <NavItem link="/events" description="EVENTS" />
          <NavItem link="/create-event" description="CREATE" />
          {/* <NavItem link="/" description="SIGN-IN" /> */}
          {/* <a href="/">HOME</a>
          <a href="/about">ABOUT</a>
          <a href="/create-event">CREATE-EVENT</a>
          <a href="/events">EVENTS</a> */}
          {isSignedIn ? (
            <>
              {/* <a href="/signout">SIGNOUT</a> */}
              <NavItem link='/signout' description='SIGNOUT'/>
            </>
          ) : (
            <>
              {/* <a href="/signup">SIGNUP</a>
              <a href="/signin">SIGNIN</a> */}
              <NavItem link='/signin' description='SIGNIN'/>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};
