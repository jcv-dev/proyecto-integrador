import React from "react";
import "../css/Loading.css";
import spinner from "../assets/spinner.svg";

const Loading = ({ isFadingOut }) => {
  return (
    <div className={`loading-container ${isFadingOut ? "fade-out" : ""}`}>
      <img className="spinner" src={spinner} />
    </div>
  );
};

export default Loading;
