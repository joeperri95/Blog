import React from "react";

const Tag = ({ tagname, count }) => {
  return (
    <React.Fragment>
      <div className="row ">
        <h5 className="row-item ">
          <a href={"/blog?q=" + tagname}>{tagname}</a>
        </h5>
        <div className="row-item count">
          <span className="badge badge-danger">{count}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tag;
