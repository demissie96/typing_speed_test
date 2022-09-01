import React, { useState, useEffect } from "react";
import Header from "./Header";
import myJson from "../words_list_1000.json";

var englishList = [];
var wordCount = 0;
var wordsWidth = 0;
var correctWord = 0;
var wrongWord = 0;
var scroll = 0;

function Generate300Words() {
  let indexNum = 0;
  // The highest typing speed ever recorded was 216 words per minute (wpm),
  // so make a list of 300 random words.

  for (let index = 0; index < 300; index++) {
    // Generate random number between 0 and 1000
    let randomNum = Math.floor(Math.random() * 1001);
    indexNum++;

    englishList.push({
      id: indexNum,
      word: myJson.words[randomNum].englishWord,
    });
    // englishList.push(myJson.words[randomNum].englishWord);
    indexNum++;
    englishList.push({ id: indexNum, word: " " });
    // englishList.push(" ");
  }
  console.log(englishList);
  // console.log(englishList);
}

function App() {
  const [wordList, setWordList] = useState("");
  const [scrollText, setScrollText] = useState(scroll);

  function CheckInputWord(input) {
    wordCount++;
    var currentElement = document.getElementById(`${wordCount}`);
    console.log(
      `Current word / input word: ${currentElement.textContent} / ${input}`
    );
   

    if (
      currentElement.textContent === input ||
      ` ${currentElement.textContent}` === input
    ) {
      console.log("nem hali");
      currentElement.style.color = "green";
      correctWord++;
    } else {
      currentElement.style.color = "red";
      wrongWord++;
    }

    console.log("width of the textbox: " + document.getElementById("displayWords").offsetWidth)
    wordsWidth += currentElement.offsetWidth;
    // Scrolling function
    if (wordsWidth > document.getElementById("displayWords").offsetWidth) {
      console.log(`scrollText: ${scrollText}`);
      scroll -= 34;
      setScrollText(scroll);
      wordsWidth = currentElement.offsetWidth;
    }
    wordCount++;
    var spaceElement = document.getElementById(`${wordCount}`);
    wordsWidth += spaceElement.offsetWidth;

    // Scrolling function
    if (wordsWidth > document.getElementById("displayWords").offsetWidth) {
      console.log(`scrollText: ${scrollText}`);
      scroll -= 34;
      setScrollText(scroll);
      wordsWidth = currentElement.offsetWidth;
    }
    console.log(currentElement.offsetWidth);
    console.log(wordsWidth);
  }

  // Run functions on initial rendering
  useEffect(() => {
    // On keypress, analyze the letter whether it's correct or not
    document.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        console.log("SPAAAAAACEEEE");
        let inputValue = document.getElementById("input");
        console.log("value: " + inputValue.value);
        CheckInputWord(inputValue.value);
        inputValue.value = "";
      }
    });
    Generate300Words();
    setTimeout(() => {
      setWordList(
        englishList.map((item) => (
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
                  backgroundColor: "#191919",
                }}
                type="text"
                id="input"
                name="input"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
