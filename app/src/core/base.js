import React from "react";

const Base = ({
  navigation="",
  title = "Title",
  description = "Description",
  className = "bg-white text-dark ",
  children,
}) => {
  return (
    <div>
      <div className="container-fluid">
        <div className="jumbotron bg-white text-dark text-center">
          <br/><p className="lead" style={{fontFamily:"inherit",fontSize:"15px"}} className="text-secondary">{navigation}</p>
        <br/><br/> <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div><br/><br/>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Base;
