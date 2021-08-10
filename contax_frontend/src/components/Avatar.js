import React from "react";
import { AiOutlineCamera } from "react-icons/ai";

const Avatar = ({ contact }) => {
  return (
    <span
      className="
            contact-avatar 
            rounded-circle
            bg-success 
            d-flex
            align-items-center 
            justify-content-center 
            text-secondary"
    >
      {/* LOAD USER AVATAR ONCE AVAILABLE */}
      <AiOutlineCamera />
    </span>
  );
};

export default Avatar;
