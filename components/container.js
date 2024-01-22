import React from "react";

const Container = (props) => {
  return (
    <div
      className={`container p-8  xl:px-5 ${
        props.className ? props.className : "mx-auto"
      }`}>
      {props.children}
    </div>
  );
}

export default Container;