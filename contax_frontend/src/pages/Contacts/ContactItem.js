import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  List,
} from "reactstrap";

import "./scss/ContactItem.scss";

const ContactItem = ({ contact }) => {
  const { firstName, lastName, email } = contact;
  return (
    <div className="col col-12 col-lg-4 pb-2 px-0 mb-1 rounded contact-item">
      <div className="contact-body p-3 d-flex rounded d-flex align-items-center ">
        <div
          className="
            contact-avatar 
            rounded-circle
            bg-info 
            p-1 
            d-flex 
            align-items-center 
            justify-content-center 
            text-secondary"
        >
          {firstName[0]}
        </div>
        <span className="ps-3">
          {firstName} {lastName}
        </span>
      </div>
    </div>
  );
};

export default ContactItem;
