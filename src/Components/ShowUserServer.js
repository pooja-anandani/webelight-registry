import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import axiosClient from "../utils/ApiClient";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { StyledTableCell, StyledTableRow } from "../utils/TableStyle";
import { UserContext } from "../utils/UserContext";
import PageNotFound from "../utils/PageNotFound";

export const ShowUserServer = () => {
  const columns = [
    { id: "id", label: "Id" },
    { id: "host", label: "Host" },
    { id: "username", label: "Username" },
    { id: "delete", label: "Action" },
  ];
  const { servers, setServers } = useContext(UserContext);
  const { userFlag } = useContext(UserContext);
  const email = window.location.pathname.split("/")[2];
  const [host, setHost] = useState([]);
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const { filteredServers, setFilteredServers } = useContext(UserContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAgree = () => {
    setFlag(true);
    axiosClient
      .post("/revoke-key-pair", { email: email, servers: host })
      .then((response) => {
        const index = servers.indexOf(host[0]);
        servers.splice(index, 1);
        setOpen(false);
        setFlag(false);
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
    setFlag(true);
    axiosClient
      .get(`/retrieve-key-pair?email=${email}`)
      .then((result) => {
        setServers(result.data?.data);
        setFilteredServers(result.data?.data);
        setFlag(false);
      })
      .catch((error) => {
        console.error(error);
        setFlag(false);
        setError(true);
      });
  }, [userFlag]);
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={flag}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {error ? (
        <PageNotFound />
      ) : filteredServers?.length === 0 ? (
        <PageNotFound />
      ) : (
        <Grid
          containter
          justify="center"
          align="center"
          marginTop={2}
          marginLeft={5}
          height="100%"
        >
          <Grid item>
            <Typography
              variant="h5"
              id="tableTitle"
              component="div"
              align="center"
              marginRight={99}
              marginBottom={2}
              justifyContent={"center"}
            >
              Server Table
            </Typography>

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
                {filteredServers?.map((row, id) => (
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
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleCloseAgree}>Yes</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ShowUserServer;
