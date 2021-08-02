import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "./scss/PlusButton.scss";

import { Link, useRouteMatch } from "react-router-dom";

const PlusButton = ({ history }) => {
  const { url } = useRouteMatch();
  console.log(url)
  return (
    <Link to='/app/add'>
      <div className="w-auto position-fixed m-2 p-0 shadow" id="plus-button">
        <AiOutlinePlus />
      </div>
    </Link>
  );
};

export default PlusButton;
