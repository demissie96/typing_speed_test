import React from "react";

function Result(props) {
  return (
    <>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#C84B31",
            marginTop: "60px",
            marginBottom: "30px",
            fontSize: "60px",
            fontFamily: "Dancing Script, cursive",
          }}
        >
          Your Speed: {props.correctWords} wpm
        </h1>
        <h3 style={{ color: "#ECDBBA" }}>
          Correct Words:{" "}
          <span
            style={{
              color: "#06FF00",
            }}
          >
            {props.correctWords}
          </span>
        </h3>
        <h3 style={{ color: "#ECDBBA" }}>
          Wrong Words:{" "}
          <span
            style={{
              color: "#FF1700",
            }}
          >
            {props.wrongWords}
          </span>
        </h3>
        <div>
          <button onClick={() => window.location.reload(true)}>
            Try Again
          </button>
        </div>
      </div>
    </>
  );
}

export default Result;
