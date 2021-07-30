import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import { Container } from "reactstrap";

import { requestAccessToken } from "../../state/AuthSlice";
import { getContacts, setContacts } from "../../state/ContactSlice";

const Contacts = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchContacts = async () => {
      await dispatch(requestAccessToken()).then((res) => {
        // requestStatus will either be 'fulfilled' or 'rejected'
        const { requestStatus } = res.meta;
        const { accessToken } = res.payload;

        if (requestStatus === "fulfilled") {
          dispatch(getContacts(accessToken));
        } else if (requestStatus === "rejected") {
          console.log("failure", res.payload);
        }
      });
    };

    fetchContacts();
  }, []);

  return <Container>Contacts</Container>;
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Contacts);
