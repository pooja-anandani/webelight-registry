import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../utils/ApiClient";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableHead,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { StyledTableCell, StyledTableRow } from "../utils/TableStyle";
import AddUser from "./AddUser";
import UserDetailsProvider, { UserContext } from "../utils/UserContext";

export var userDetailContext = React.createContext(null);

const columns = [
  { id: "id", label: "Id" },
  { id: "email", label: "Email" },
  { id: "add server", label: "Actions" },
];

function UserDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(false);
  const { userFlag } = useContext(UserContext);


 
  const navigateServer = (email) => {
    navigate(`/servers/${email}`);
  };

  useEffect(() => {
    setFlag(true)
    axiosClient
      .get("/retrieve-users")
      .then((result) => {
        setUsers(result.data);
        setFlag(false)
      })
      .catch((error) => {
        console.error(error);
      });
      
  }, [userFlag]);
 
  return (
    <div>
        <Backdrop
       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
       open={flag}
       
     >
        < CircularProgress color="inherit" />

     </Backdrop>
      <Grid
        containter
        justify="center"
        align="center"
        marginTop={2}
        marginLeft={5}
        height="100%"
      >
        <Grid item>
        <Typography  variant="h5" id="tableTitle" component="div" align="center" marginRight={100} marginBottom={2} justifyContent={"center"}>
          User Table
        </Typography>
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
