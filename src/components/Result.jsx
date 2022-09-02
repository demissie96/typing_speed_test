import React from "react";
import "./Result.css";

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
          Speed: {props.correctWords} wpm
        </h1>
        <h5 style={{ color: "#ECDBBA" }}>
          Correct Words:{" "}
          <span
            style={{
              color: "#06FF00",
            }}
          >
            {props.correctWords}
          </span>
        </h5>
        <h5 style={{ color: "#ECDBBA" }}>
          Wrong Words:{" "}
          <span
            style={{
              color: "#FF1700",
            }}
          >
            {props.wrongWords}
          </span>
        </h5>
        <div>
          <button
            type="button"
            className="btn btn-outline-primary"
            style={{ marginTop: "60px" }}
            onClick={() => window.location.reload(true)}
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  );
}

export default Result;
