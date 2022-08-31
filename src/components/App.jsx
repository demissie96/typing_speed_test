import React from "react";
import Header from "./Header";
import myJson from "../words_list_1000.json";

function App() {
  // The highest typing speed ever recorded was 216 words per minute (wpm),
  // so make a list of 300 random words.
  var hungarianList = [];
  var englishList = [];

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

  const wordList = hungarianList.map((item) => (
    // wordBoxes is for measuring the element width with 'offsetWidth'
    <div
      className="wordBoxes"
      style={{ fontSize: "30px", color: "white", height: "34px" }}
    >
      {item}
    </div>
  ));

  return (
    <>
      <Header />
      <div id="workingArea" style={{ height: "128"}}>
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
            top: "0px",
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
        ></div>
      </div>
    </>
  );
}

export default App;
