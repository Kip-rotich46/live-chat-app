# Live Chat App

This project is a `Live Chat App` created using Vite and TypeScript, utilizing the `@stream-io/video-react-sdk`.

### The Room
The ROom. This component handles call state hooks, user permissions, and displays call participants.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the development server:**
    ```bash
    npm start
    ```

## Usage

The `Room` component is the main part of this project. It utilizes several hooks from the `@stream-io/video-react-sdk` to manage call state and user permissions. Here's how the component is structured:

```typescript
import { OwnCapability, useCallStateHooks, useRequestPermission } from "@stream-io/video-react-sdk";
import Controls from "./controls";
import { useUser } from "../../user-context";
import PermissionRequestPanel from "./permissionrequest";
import Participants from "./Participants";

const Room = () => {
  const { useCallCreatedBy, useCallCustomData, useParticipants } = useCallStateHooks();
  const { user } = useUser();

  const custom = useCallCustomData();
  const participants = useParticipants();
  const createdBy = useCallCreatedBy();

  const { hasPermission, requestPermission } = useRequestPermission(OwnCapability.SEND_AUDIO);

  return (
    <div className="room">
      <h2 className="title">{custom?.title ?? 'TITLE'}</h2>
      <h3 className="h3">{custom?.description ?? 'DESCRIPTION'}</h3>
      <p className="participants-count">{participants?.length} participants</p>
      <Participants />
      {user?.username === createdBy?.id && <PermissionRequestPanel />}
      {hasPermission ? <Controls /> : <button onClick={requestPermission}>✋</button>}
    </div>
  );
};

export default Room;
```

## Components

### Room

The `Room` component is the main container for the chat room. It includes the following functionalities:
- Displays the title and description of the room.
- Shows the number of participants.
- Renders the `Participants` component.
- Shows a `PermissionRequestPanel` if the current user is the one who created the call.
- Renders `Controls` if the user has the necessary permissions, otherwise shows a button to request permission.

### Controls

The `Controls` component is used to manage call controls like muting and unmuting.

### PermissionRequestPanel

The `PermissionRequestPanel` is shown to the user who created the call to request necessary permissions for sending audio.

### Participants

The `Participants` component lists all participants in the call.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

