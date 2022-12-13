import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import axiosClient from "../utils/ApiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../utils/UserContext";


const initialErrorState = {
  email: "",
};

const AddUser = (props) => {
  const { userFlag, setUserFlag } = useContext(UserContext);
  const [flag, setFlag] = useState(false);
  const initialState = {
    email: props.email,
    username: "",
    host: "",
  };

  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState(initialErrorState);

  const handleClose = () => {
    setValues(initialState);
    setErrors(initialErrorState);
    props.close();
  };

  const checkForm = () => {
    var formInvalid = false;
    var errorsInForm = false;
    for (var i in values) {
      if (values[i] === "") {
        formInvalid = true;
      } else {
        if (i === "email") {
          var errors = validate(i, values[i]);
          setErrors({ ...errors });
          if (errors.email !== "") {
            errorsInForm = true;
          }
        }
      }
    }
    return formInvalid || errorsInForm;
  };

  const validate = (name, value) => {
    let errorsObj = { ...errors };
    if (name === "email") {
      if (value) {
        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/i.test(value)) {
          errorsObj.email = "Please enter valid email address";
        } else {
          errorsObj.email = "";
        }
      } else {
        errorsObj.email = "";
      }
    }

    return errorsObj;
  };
  const handleChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    setValues({ ...values, [name]: value });
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

  const submit = (event) => {
    event.preventDefault();
    setFlag(true);
    var response = checkForm();
    if (response) {
      notifyerror();
    } else {
      axiosClient
        .post("/setup-key-pair", {
          email: values.email || props.email,
          host: values.host,
          username: values.username,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("Record created ");
            setUserFlag(!userFlag);
            setValues(initialState);
            setFlag(false);
            props.close();
          }
        })
        .catch((error) => {
          notifyerror();
          props.close();
        });
    
  };
}

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={flag}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog open={props.open} onClose={props.close} aria-labelledby="edit">
        <DialogTitle id="edit">Enter Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Please, enter the information</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={props.email}
            fullWidth
            onChange={handleChange}
            error={errors.email !== ""}
            helperText={errors.email ? "Please enter valid email address" : ""}
            readonly={props.readFlag}
          />

          <TextField
            required
            margin="dense"
            id="host"
            name="host"
            label="Host"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={submit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
