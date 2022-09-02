import React from "react";

function Timer(props) {
  return (
    <>
      <div>
        <h1
          style={{
            color: "#C84B31",
            marginTop: "60px",
            fontSize: "40px",
            fontFamily: "Dancing Script, cursive",
          }}
        >
          Timer: {props.second}s
        </h1>
      </div>
    </>
  );
}

export default Timer;
