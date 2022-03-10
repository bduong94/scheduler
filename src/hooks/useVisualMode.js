import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //Function to transition to the next component
  function transition(nextMode, replace = false) {
    const historyCopy = [...history];

    if (replace) {
      //If there is an error with the deletion, will not keep track of confirmation for deletion
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

  //Function to transition to the previous component
  function back() {
    const historyCopy = [...history];
    if (historyCopy.length > 1) {
      setMode(historyCopy[historyCopy.length - 2]);
      historyCopy.pop();
      setHistory(historyCopy);
    } else {
      //Prevents backing from the initial state button
      setMode(historyCopy[0]);
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
