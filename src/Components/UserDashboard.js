import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../utils/ApiClient";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Table,
  TableBody,
  TableHead
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { StyledTableCell, StyledTableRow } from "../utils/TableStyle";
import AddUser from "./AddUser";
import UserDetailsProvider, { UserContext } from "../utils/UserContext";

export var userDetailContext = React.createContext(null);

const columns = [
  { id: "id", label: "Id" },
  { id: "email", label: "Email" },
  { id: "add server", label: "Modify" },
];

function UserDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { userFlag } = useContext(UserContext);

 
  const navigateServer = (email) => {
    navigate(`/servers/${email}`);
  };

  useEffect(() => {
    axiosClient
      .get("/retrieve-users")
      .then((result) => {
        console.log(result.data)
        setUsers(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
      
  }, [userFlag]);
 
  return (
    <div>
      <Grid
        containter
        justify="center"
        align="center"
        marginTop={2}
        marginLeft={5}
        height="100%"
      >
        <Grid item>
          <Table
            stickyHeader
            sx={{ outline: "black" }}
            style={{
              maxHeight: "100%",
              width: "50%",
              tableLayout: "auto",
              border: "1px solid grey",
              borderRadius:"5px"              
            }}
            aria-label="user table"
          >
            <TableHead>
              <StyledTableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    style={{
                      backgroundColor: "#1976d2",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {users?.data?.map((row, col) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {col + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>
                    <EditIcon onClick={() => navigateServer(row.email)}>
                      {" "}
                      Add Server
                    </EditIcon>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <AddUser />    
    </div>
  );
}
export default UserDashboard;
