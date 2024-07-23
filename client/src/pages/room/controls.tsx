import React from "react";
import MicButton from "./mic-button";
import LiveButton from "./live-button";

const Controls = () => {
  return (
    <div className="controls-panel">
      <MicButton />
      <LiveButton />
    </div>
  );
};

export default Controls;
