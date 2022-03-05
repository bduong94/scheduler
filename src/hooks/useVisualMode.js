import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {
    const historyCopy = [...history];

    if (replace) {
      historyCopy.pop();
      historyCopy.push(nextMode);
      setMode(nextMode);
      setHistory(historyCopy);
    } else {
      historyCopy.push(nextMode);
      setMode(nextMode);
      setHistory(historyCopy);
    }
  }

  function back() {
    const historyCopy = [...history];
    if (historyCopy.length > 1) {
      setMode(historyCopy[historyCopy.length - 2]);
      historyCopy.pop();
      setHistory(historyCopy);
    } else {
      setMode(historyCopy[0]);
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
