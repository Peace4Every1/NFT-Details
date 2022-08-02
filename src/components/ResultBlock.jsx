import React from "react";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ResultBlock = ({ address, id }) => (
  <Link to={`details/${address}/${id}`}>
    <div className="result-block">
      <span className="result-address regular-text">{address}</span>
      <RightOutlined className="regular-text result-icon" />
    </div>
  </Link>
);

export default ResultBlock;
