import { OwnCapability, useCallStateHooks, useRequestPermission } from "@stream-io/video-react-sdk"
import Controls from "./controls";
import { useUser } from "../../user-context";
import PermissionRequestPanel from "./permissionrequest";
import Participants from "./Participants";

const Room = () => {
  const { useCallCreatedBy, useCallCustomData, useParticipants} = useCallStateHooks();
  const { user } = useUser();

  const custom = useCallCustomData();
  const participants = useParticipants();
  const createdBy = useCallCreatedBy();

  const { hasPermission, requestPermission} = useRequestPermission(OwnCapability.SEND_AUDIO);
  return (
    <div className="room">
      <h2 className="title">{custom?.title ?? 'TITLE'}</h2>
      <h3 className="h3">{custom?.description ?? 'DESCRIPTION'}</h3>
      <p className="participants-count">{participants?.length} participants</p>
      <Participants />
      {user?.username === createdBy?.id && <PermissionRequestPanel />}
     { hasPermission ? <Controls /> : <button onClick={requestPermission}> &#9995; </button>}
    </div>
  )
}

export default Room
