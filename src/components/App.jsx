import React, { useState, useEffect } from "react";
import Header from "./Header";
import myJson from "../words_list_1000.json";

var hungarianList = [];
var englishList = [];

function Generate300Words() {
  for (let index = 0; index < 300; index++) {
    // Generate random number between 0 and 1000
    let randomNum = Math.floor(Math.random() * 1001);

    hungarianList.push(myJson.words[randomNum].hungarianWord);
    englishList.push(myJson.words[randomNum].englishWord);
    hungarianList.push(" ");
    englishList.push(" ");
  }
  console.log(hungarianList);
  console.log(englishList);
}

function App() {
  const [wordList, setWordList] = useState("");
  const [scrollText, setScrollText] = useState(0);

  // The highest typing speed ever recorded was 216 words per minute (wpm),
  // so make a list of 300 random words.

  // Run functions on initial rendering
  useEffect(() => {
    // On keypress, analyze the letter whether it's correct or not
    document.addEventListener("keydown", (event) => {
      console.log(event.key);
    });
    Generate300Words();
    setTimeout(() => {
      setWordList(
        hungarianList.map((item) => (
          // wordBoxes is for measuring the element width with 'offsetWidth'
          <div
            className="wordBoxes"
            style={{ fontSize: "30px", color: "white", height: "34px" }}
          >
            {item}
          </div>
        ))
      );
    }, 500);
  }, []);

  return (
    <>
      <Header />
      <div id="workingArea" style={{ height: "128" }}>
        <div
          id="coverElement1"
          style={{
            position: "relative",
            margin: "0 auto 0",
            width: "800px",
            height: "60px",
            backgroundColor: "#191919",
            zIndex: 1,
          }}
        ></div>
        <div
          id="displayWords"
          style={{
            display: "flex",
            position: "relative",
            whiteSpace: "pre",
            width: "800px",
            height: "69.82px",
            overflow: "visible",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            margin: "0 auto 0",
            // this moves the text with 34px = 1 row
            top: `${scrollText}px`,
          }}
        >
          {wordList}
        </div>
        <div
          id="coverElement2"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            margin: "0 auto 0",
            width: "850px",
            height: "1200px",
            backgroundColor: "#191919",
            top: "216px",
            zIndex: 0,
          }}
        >
          <div>
            <button onClick={() => setScrollText(scrollText - 34)}>
              Scroll down
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
