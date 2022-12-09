import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../utils/ApiClient";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { StyledTableCell, StyledTableRow } from "../utils/TableStyle";
import { UserContext } from "../utils/UserContext";

export const ShowUserServer = () => {
  const columns = [
    { id: "id", label: "Id" },
    { id: "host", label: "host" },
    { id: "username", label: "username" },
    { id: "delete", label: "" },
  ];
  const [server, setServer] = useState([]);
  const { userFlag } = useContext(UserContext);
  const email = window.location.pathname.split("/")[2];
  const [host, setHost] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAgree = () => {
    axiosClient
      .post("/revoke-key-pair", { email: email, servers: host })
      .then((response) => {
        const index = server.data.indexOf(host[0]);
        server.data.splice(index, 1);
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChoosedRow = (row) => {
    setHost([row]);
    setOpen(true);
  };

  useEffect(() => {
    axiosClient
      .get(`/retrieve-key-pair?email=${email}`)
      .then((result) => {
        setServer(result.data);
        console.log(result);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [userFlag]);
  return (
    <>
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
            }}
            aria-label="user table"
          >
            <TableHead>
              <StyledTableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      backgroundColor: "#1976d2",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {server?.data?.map((row, id) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {id + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.host}</StyledTableCell>
                  <StyledTableCell>{row.username}</StyledTableCell>
                  <StyledTableCell>
                    <Delete
                      data-item={row}
                      onClick={() => handleChoosedRow(row._id)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title"></DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to revoke the access of the server?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Disagree
              </Button>
              <Button onClick={handleCloseAgree} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};

export default ShowUserServer;
