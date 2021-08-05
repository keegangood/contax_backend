import React from "react";

const Avatar = ({ contact, height, width }) => {
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
      {contact.firstName[0].toUpperCase()}
    </span>
  );
};

export default Avatar;
