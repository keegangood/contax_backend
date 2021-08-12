import React from "react";

import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";

const Hamburger = ({ navOpen, setNavOpen, textColor }) => {
  return (
    <span
      className={
        "nav-toggle-icon position-absolute position-fixed end-0 p-2 " +
        `text-${navOpen ? "light" : "secondary"}`
      }
      onClick={() => {
        setNavOpen(!navOpen);
      }}
    >
      {navOpen ? <AiOutlineCloseCircle/> : <AiOutlineMenu />}
    </span>
  );
};

export default Hamburger;
