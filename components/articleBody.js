import React from "react";
import Container from "./container";

const Content = (props) => {
  return (
    <Container
      className={`flex w-full flex-col mx-auto mt-4 ${
        props.align === "left" ? "" : "items-center justify-center text-center"
      }`}>
      {props.content && (
        <div className="text-sm tracking-wider dark:text-white text-black">
          {props.content}
        </div>
      )}
    </Container>
  );
}

export default Content;