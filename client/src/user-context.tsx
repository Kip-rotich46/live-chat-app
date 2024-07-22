import { StreamVideoClient } from "@stream-io/video-react-sdk";
import React, { createContext, useState, ReactNode, useContext } from "react";

export interface User {
  username: string;
  name: String;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  client: StreamVideoClient | undefined;
  setClient: (client: StreamVideoClient | undefined) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<StreamVideoClient>();

  return (
    <UserContext.Provider value={{ user, setUser, client, setClient }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () =>{
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUser must be within a provider')
    }
    
    return context;
}
