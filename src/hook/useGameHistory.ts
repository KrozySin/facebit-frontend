import { useContext } from "react";
import {
  GameHistoryContext,
  GameHistoryContextValue,
} from "../context/GameHistoryContext";

export const useGameHistory = () => {
  // const ro = new ResizeObserver((entries, observer) => {
  //   console.log("Body has resized!");
  //   observer.disconnect(); // Stop observing
  // });

  // ro.unobserve(document.body); // Watch dimension changes on body

  const context = useContext(GameHistoryContext) as GameHistoryContextValue;
  if (!context) {
    throw new Error(
      "Make sure useGameHistory to only call use within a <GameHistoryProvider>"
    );
  }
  return context;
};
