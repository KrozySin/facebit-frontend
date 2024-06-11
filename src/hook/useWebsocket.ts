import { useContext } from "react";
import {
  WebsocketContext,
  WebsocketContextValue,
} from "../context/WebsocketContext";

export const useWebsocket = () => {
  // const ro = new ResizeObserver((entries, observer) => {
  //   console.log("Body has resized!");
  //   observer.disconnect(); // Stop observing
  // });

  // ro.unobserve(document.body); // Watch dimension changes on body

  const context = useContext(WebsocketContext) as WebsocketContextValue;
  if (!context) {
    throw new Error(
      "Make sure useWebsocket to only call use within a <WebsocketProvider>"
    );
  }
  return context;
};
