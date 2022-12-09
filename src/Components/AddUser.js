import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import axiosClient from "../utils/ApiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userDetailContext } from "./UserDashboard";
import { UserContext } from "../utils/UserContext";

const AddUser = (props) => {
  const {userFlag,setUserFlag} = useContext(UserContext);

  const [values, setValues] = React.useState({
    email: props.email,
    username: "",
    host: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
    username: "",
    host: "",
  });

  const checkForm = () => {
    var formInvalid = false;
    for (var i in values) {
      if (values[i] == "") {
        formInvalid = true;
        break;
      }
    }
    var errorsInForm = false;
    for (var i in errors) {
      if (errors[i] != "") {
        errorsInForm = true;
        break;
      }
    }
    return formInvalid || errorsInForm;
  };

  const validate = (name, value) => {
    let errorsObj = { ...errors };
    if (name === "username") {
      if (!/^[A-Za-z]+$/i.test(value)) {
        errorsObj.username = "Invalid username";
      } else if (value === "") {
        errorsObj.username = "Invalid username";
      } else {
        errorsObj.username = "";
      }
    }

    if (name === "email") {
      if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i.test(value)) {
        errorsObj.email = "Please enter valid email address";
      } else if (value === "") {
        errorsObj.username = "Invalid email";
      } else {
        errorsObj.email = "";
      }
    }
    if (name === "host") {
      if (value === "") {
        errorsObj.username = "Invalid email";
      }
    }

    return errorsObj;
  };
  const handleChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    setValues({ ...values, [name]: value });
    var errors = validate(name, value);
    setErrors({ ...errors });
  };


  const notifyerror = () => {
    toast.error("error !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifysucess = () => {
    toast.success("record created ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const submit = (event) => {
    event.preventDefault();
    var response = checkForm();
    if (response) {
      notifyerror();
    } else {
      axiosClient
        .post("/setup-key-pair", {
          email: values.email,
          host: values.host,
          username: values.username,
        })
        .then((res) => {
          if (res.status == 200) {
            notifysucess();
            setUserFlag(!userFlag);
            props.close();
          }
        })
        .catch((error) => {
          console.log(error);
          notifyerror();
        });
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.close} aria-labelledby="edit">
        <DialogTitle id="edit">Enter Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Please, enter the information</DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={props.email}
            onChange={handleChange}
            error={errors.email != ""}
            helperText={errors.email ? "Please enter valid email address" : ""}
            readonly={props.readFlag}
          />

          <TextField
            required
            autoFocus
            margin="dense"
            id="host"
            name="host"
            label="host"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="username"
            name="username"
            label="username"
            type="text"
            fullWidth
            onChange={handleChange}
            error={errors.username != ""}
            helperText={errors.username ? "Please enter valid username" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color="secondary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            <ToastContainer />
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUser;
