import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import { Container } from "reactstrap";

import ContactList from "./ContactList";

import { requestAccessToken } from "../../state/AuthSlice";
import { getContacts, setContacts } from "../../state/ContactSlice";

import './scss/Contacts.scss';

const Contacts = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { contacts } = useSelector((state) => state.contacts);

  useEffect(() => {
    const fetchContacts = async () => {
      await dispatch(requestAccessToken())
        .then((res) => {
          // requestStatus will either be 'fulfilled' or 'rejected'

          console.log(res);

          const { requestStatus } = res.meta;
          const { accessToken } = res.payload;

          if (requestStatus === "fulfilled") {
            dispatch(getContacts(accessToken));
          } else if (requestStatus === "rejected") {
            console.log("failure", res.payload);
          }
        })
        .catch((err) => console.error(err));
    };

    fetchContacts();
  }, []);

  return (
    <Container>
      <div className="row g-0">
        <div className="col col-12 col-md-8 offset-md-2">
          <ContactList contacts={contacts} />
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Contacts);
