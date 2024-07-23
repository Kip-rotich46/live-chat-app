import React from "react";
import { useCallStateHooks } from '@stream-io/video-react-sdk'


const MicButton = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute } = useMicrophoneState();

  return (
    <button
      onClick={async () => {
        if (isMute) {
          await microphone.enable();
        } else {
          await microphone.disable();
        }
      }}
    >
      {isMute ? "Unmute" : "Mute"}
    </button>
  );
};

export default MicButton;
