import React, { useState, useEffect } from "react";
import Header from "./Header";
import myJson from "../words_list_1000.json";

var hungarianList = [];
var englishList = [];
var letterCount = 0;
var wordsWidth = 0;

function Generate300Words() {
  let indexNum = 0;
  for (let index = 0; index < 300; index++) {
    // Generate random number between 0 and 1000
    let randomNum = Math.floor(Math.random() * 1001);
    indexNum++;

    hungarianList.push({
      id: indexNum,
      word: myJson.words[randomNum].hungarianWord,
    });
    // englishList.push(myJson.words[randomNum].englishWord);
    indexNum++;
    hungarianList.push({ id: indexNum, word: " " });
    // englishList.push(" ");
  }
  console.log(hungarianList);
  // console.log(englishList);
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
            id={`${item.id}`}
            key={item.id}
            style={{ fontSize: "30px", color: "white", height: "34px" }}
          >
            {item.word}
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
            <button
              onClick={() => {
                letterCount++;
                var currentElement = document.getElementById(`${letterCount}`);
                console.log(currentElement);
                console.log(currentElement.offsetWidth);
                console.log(wordsWidth);
                currentElement.style.color = "green";
                wordsWidth += currentElement.offsetWidth;
                if (wordsWidth > 800) {
                  setScrollText(scrollText - 34);
                  wordsWidth = currentElement.offsetWidth;
                }
              }}
            >
              Step green
            </button>
            <button
              onClick={() => {
                letterCount++;
                var currentElement = document.getElementById(`${letterCount}`);
                console.log(currentElement);
                currentElement.style.color = "red";
              }}
            >
              Step red
            </button>
            <button
              onClick={() => {
                var currentElement = document.getElementById(`${letterCount}`);
                console.log(currentElement);
                currentElement.style.color = "white";
                letterCount--;
              }}
            >
              Step back
            </button>
            <br></br>
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  marginTop: "60px",
                  fontFamily: "Dancing Script, cursive",
                  color: "#ECDBBA",
                }}
              >
                Start Typing
              </h1>
              <input
                style={{
                  height: "40px",
                  width: "600px",
                  fontSize: "30px",
                  color: "white",
                  fontFamily: "serif",
                  textAlign: "center",
                }}
                type="text"
                id="input"
                name="input"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
