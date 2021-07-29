import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import { Container } from "reactstrap";

import { requestAccessToken } from "../../state/AuthSlice";
import { getContacts, setContacts } from "../../state/ContactSlice";

const Contacts = () => {
  const dispatch = useDispatch();

  const {user} = useSelector(state=>state.auth)

  useEffect(() => {
    const fetchContacts = async () => {
      await dispatch(requestAccessToken())
        .then((res) => {
          // status will either be 'fulfilled' or 'rejected'
          const status = res.meta.requestStatus;

          if(status === 'fulfilled'){
            dispatch(getContacts(user))
          } else if(status === 'rejected'){
            console.log('failure', res.payload);
          }
        })
    };

    fetchContacts();
  }, []);

  return <Container>Contacts</Container>;
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Contacts);
