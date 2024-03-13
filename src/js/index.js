import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "../styles/index.css";

function SimpleCounter(props) {
  return (
    <div className="bigCounter">
      <div className="calendar">
        {<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
</svg>}
      </div>
      <div className="four">{props.digitFour % 10}</div>
      <div className="three">{props.digitThree % 10}</div>
      <div className="two">{props.digitTwo % 10}</div>
      <div className="one">{props.digitOne % 10}</div>
    </div>
  );
}

SimpleCounter.propTypes = {
  digitFour: PropTypes.number,
  digitThree: PropTypes.number,
  digitTwo: PropTypes.number,
  digitOne: PropTypes.number,
};

function App() {
  const [isCounting, setIsCounting] = useState(false);
  const [counter, setCounter] = useState(0);
  const [clickCount, setClickCount] = useState(0); // New state for click count
  const intervalIdRef = useRef(null);

  const handleStart = () => {
    if (!isCounting) {
      intervalIdRef.current = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
      setIsCounting(true);
    }
  };

  const handleStop = () => {
    if (isCounting) {
      clearInterval(intervalIdRef.current);
      setIsCounting(false);
    }
  };

  const handleReset = () => {
    clearInterval(intervalIdRef.current);
    setIsCounting(false);
    setCounter(0);
    setClickCount(0); // Also reset click count
  };

  const handleClickCount = () => {
    setCounter((prevCounter) => prevCounter + 1);
    setClickCount((prevCount) => prevCount + 1); // Increment click count
  };

  return (
    <div>
      <SimpleCounter
        digitOne={counter % 10}
        digitTwo={Math.floor(counter / 10) % 10}
        digitThree={Math.floor(counter / 100) % 10}
        digitFour={Math.floor(counter / 1000) % 10}
      />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleClickCount}>Click to Count</button>
      {/* Display click counter */}
      <p>Clicks: {clickCount}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));

