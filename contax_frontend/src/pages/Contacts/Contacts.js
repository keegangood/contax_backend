import React, {useEffect} from 'react'
import { useDispatch, useSelector, connect } from "react-redux";

import {Container} from 'reactstrap';

const Contacts = () => {

  useEffect(()=>{
    const fetchContacts = async () => {}
  },[])

  return (
    <Container>
      Contacts
    </Container>
  )
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(Contacts)
