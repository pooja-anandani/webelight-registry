import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserDetailsProvider = (props) => {
  const [userFlag, setUserFlag] = useState(false);
  

  return (
    <UserContext.Provider
      value={{
        userFlag,
        setUserFlag
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserDetailsProvider;
