import React from "react";

const TextBlock = ({ title, value }) => (
  <div className="text-block-container">
    <p className="title-sm align-left">{title}</p>
    <p className="block-text">{value}</p>
  </div>
);

export default TextBlock;
