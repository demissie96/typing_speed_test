import React, { useState, useEffect } from "react";
import Header from "./Header";
import myJson from "../words_list_1000.json";
import Timer from "./Timer";
import Result from "./Result";

var englishList = [];
var wordCount = 0;
var wordsWidth = 0; // Sum of the words' width in a row
var correctWord = 0;
var wrongWord = 0;
var scroll = 0;
var sec = 60;
var timer = false;
var dontChangeTimer = false; // For preventing timer to set true on keypress

// The highest typing speed ever recorded was 216 words per minute (wpm),
// so make a list of 280 random words.
function Generate280Words() {
  let indexNum = 0;
  for (let index = 0; index < 280; index++) {
    // Generate random number between 0 and 1000
    let randomNum = Math.floor(Math.random() * 1001);
    indexNum++;

    englishList.push({
      id: indexNum,
      word: myJson.words[randomNum]?.englishWord,
    });
    indexNum++;
    englishList.push({ id: indexNum, word: " " });
  }
}

function App() {
  const [wordList, setWordList] = useState("");
  const [scrollText, setScrollText] = useState(scroll);
  const [timerOn, setTimerOn] = useState(timer);
  const [second, setSecond] = useState(sec);
  const [showResult, setShowResult] = useState(false);

  // Start the countdown
  function StartCounting() {
    timer = true;
    setTimerOn(true); // For conditional rendering Timer component

    // Countdown process
    var myInterval = setInterval(() => {
      setSecond((prevCount) => prevCount - 1);
      sec--;

      // Stop the countdown when it reaches 0s
      if (sec === 0) {
        timer = false;
        dontChangeTimer = true;
        setTimerOn(false);
        clearInterval(myInterval);
        setShowResult(true);
      }
    }, 1000);

    // This line is essential for setInterval work properly in React
    return () => clearInterval();
  }

  // Scroll when the words' width in a row is greater than the flexbox width
  function Scrolling(element) {
    if (wordsWidth > document.getElementById("displayWords").offsetWidth) {
      scroll -= 34;
      // After scrolling, make the first element width equal to wordsWidth
      wordsWidth = element.offsetWidth;

      setScrollText(scroll); // Do the scrolling
    }
  }

  function CheckInputWord(input) {
    // Get the next word to be checked from the list
    wordCount++;
    var currentElement = document.getElementById(`${wordCount}`);

    if (
      currentElement.textContent === input ||
      ` ${currentElement.textContent}` === input
    ) {
      currentElement.style.color = "#06FF00"; // Change correct word style to green,
      correctWord++;
    } else {
      currentElement.style.color = "#FF1700"; // Change wrong word style to red,
      wrongWord++;
    }

    wordsWidth += currentElement.offsetWidth;

    // Scrolling function
    Scrolling(currentElement);

    // Check space element width for scrolling
    wordCount++;
    var spaceElement = document.getElementById(`${wordCount}`);
    wordsWidth += spaceElement.offsetWidth;

    // Scrolling function
    Scrolling(spaceElement);
  }

  // Run functions on initial rendering
  useEffect(() => {
    Generate280Words();

    // On keypress
    document.addEventListener("keydown", (event) => {
      // Start timer on first keypress and prevent restart timer with dontChangeTimer
      // when timer reach 0
      if (timer === false && dontChangeTimer === false) {
        timer = true;
        setTimerOn(true);
        StartCounting();
      }
      // On space press check input value and make the input box empty
      if (event.key === " " && timer === true) {
        let inputValue = document.getElementById("input");
        CheckInputWord(inputValue.value);
        inputValue.value = "";
      }
    });

    // Render the random list of words
    setWordList(
      englishList.map((item) => (
        <div
          id={`${item.id}`}
          key={item.id}
          style={{ fontSize: "25px", color: "white", height: "34px" }}
        >
          {item.word}
        </div>
      ))
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {showResult === false && (
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
              padding: "0",
              // this moves the text with 34px = 1 row
              top: `${scrollText}px`,
              zIndex: 0,
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
                    height: "45px",
                    width: "600px",
                    fontSize: "25px",
                    color: "white",
                    textAlign: "center",
                    backgroundColor: "#191919",
                  }}
                  type="text"
                  id="input"
                  name="input"
                  autoComplete="off"
                  autoFocus={true}
                />
                {timerOn && <Timer second={second} />}
              </div>
            </div>
          </div>
        </div>
      )}
      {showResult && (
        <Result correctWords={correctWord} wrongWords={wrongWord} />
      )}
    </>
  );
}

export default App;
