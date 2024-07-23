import { Call, StreamVideoClient, User as StreamUserType } from "@stream-io/video-react-sdk";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import Cookies from "universal-cookie";

export interface User {
  username: string;
  name: String;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  client: StreamVideoClient | undefined;
  setClient: (client: StreamVideoClient | undefined) => void;
  call: Call | undefined;
  setCall: (call: Call | undefined) => void;
  isLoadingClient: boolean
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const useUser = () =>{
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUser must be within a provider')
    }
    
    return context;
}
 
export const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();
  const [isLoadingClient, setIsLoadingClient] = useState<boolean>(true)
  const cookies = new Cookies();

  useEffect(() =>{
    const token = cookies.get('token');
    const username = cookies.get('username');
    const name = cookies.get('name');

    if(!token || !username || !name){
      setIsLoadingClient(false);
       return
      };

    const user : StreamUserType ={
      id: username,
      name
    }
    const myClient = new StreamVideoClient ({
      apiKey: "4ar926p6bgh5",
      user,
      token,
    });

    setClient(myClient);
    setUser({username, name});
    setIsLoadingClient(false);

    return () =>{
      myClient.disconnectUser();
      setClient(undefined);
      setUser(null)
    }
  },[])

  return (
    <UserContext.Provider value={{ user, setUser, client, setClient, call, setCall, isLoadingClient }}>
      {props.children}
    </UserContext.Provider>
  );
};

