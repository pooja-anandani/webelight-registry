import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserDetailsProvider = (props) => {
  const [userFlag, setUserFlag] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredServers, setFilteredServers] = useState([]);
  const [servers, setServers] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userFlag,
        setUserFlag,
        users,
        setUsers,
        filteredUsers,
        setFilteredUsers,
        filteredServers,
        setFilteredServers,
        servers,
        setServers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserDetailsProvider;
