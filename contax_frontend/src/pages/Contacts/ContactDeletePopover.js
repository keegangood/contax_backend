import React from "react";
import { Row, Col, Fade } from "reactstrap";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

const ContactDeletePopover = ({
  popoverIsOpen,
  togglePopover,
  contact,
  onDeleteContact,
}) => {
  return (
    <>
      {/* DELETE CONTACT POPOVER */}
      <Fade
        in={popoverIsOpen}
        className={
          "delete-contact-popover g-0 position-absolute " +
          "border border-secondary rounded px-0 " +
          (popoverIsOpen ? "d-block" : "d-none")
        }
      >
        <Row className="g-0 h-100">
          <Col
            xs={12}
            className="
              delete-contact-popover-header
              text-center
              p-4
              lead
              d-flex
              align-items-center
              justify-content-center
            "
            onClick={() => {
              togglePopover(contact.id, !popoverIsOpen);
            }}
          >
            <span>
              Delete <br />
              {contact.firstName} {contact.lastName}?
            </span>
          </Col>
          <Col
            xs={{ size: 8, offset: 2 }}
            md={{ size: 6, offset: 3 }}
            className="
              delete-contact-popover-body
              d-flex
              align-items-center
              justify-content-around
              pb-5 pt-3 pt-md-4
            "
          >
            <span
              className="
                crud-icon delete-confirm-icon
                d-flex
                align-items-center
                justify-content-center
              "
              onClick={() => onDeleteContact(contact.id)}
            >
              <AiOutlineCheckCircle />
            </span>
            <span
              className="
                crud-icon delete-cancel-icon
                d-flex
                align-items-center
                justify-content-center
              "
              onClick={() => togglePopover(contact.id, !popoverIsOpen)}
            >
              <AiOutlineCloseCircle />
            </span>
          </Col>
        </Row>
      </Fade>
    </>
  );
};

export default ContactDeletePopover;
