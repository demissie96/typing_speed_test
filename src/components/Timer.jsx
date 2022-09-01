import React, { useState, useEffect } from "react";

var timerOn = true;
var sec = 3;

function Timer() {
  const [second, setSecond] = useState(3);
  const [timerOn, setTimerON] = useState(true);

  useEffect(() => {
    var myInterval =  setInterval(() => {
      setSecond((prevCount) => prevCount - 1);
      sec--;
      console.log(sec);
      if (sec === 0) {
        setTimerON(false);
        clearInterval(myInterval);
      }
    }, 1000);

    // This line is essential for setInterval work properly in React
    return () => clearInterval();
  }, []);
  return (
    <>
      {timerOn && (
        <h1
          style={{
            color: "#C84B31",
            marginTop: "60px",
            fontSize: "40px",
            fontFamily: "Dancing Script, cursive",
          }}
        >
          Timer: {second}s
        </h1>
      )}
    </>
  );
}

export default Timer;
