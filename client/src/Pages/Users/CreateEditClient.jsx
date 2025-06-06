import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient, createEmployee, updateClient } from "../../redux/action/user";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen, scroll, isEdit = false }) => {
  //////////////////////////////////////// VARIABLES /////////////////////////////////////
  const { selectedClient, isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialClientState = {
    firstName: "",
    username: "",
    phone: "",
    email: "",
  }
  //////////////////////////////////////// STATES /////////////////////////////////////
  const [clientData, setClientData] = useState(isEdit ? selectedClient : initialClientState);
  const [errors, setErrors] = useState({});

  //////////////////////////////////////// USE EFFECTS /////////////////////////////////////

  //////////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, username, phone, email } = clientData
    const newErrors = {};
    if (!firstName) newErrors.firstName = "Client Name is required";
    if (!username) newErrors.username = "Client Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!phone) newErrors.phone = "Phone number is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear previous errors
    if (isEdit) {
        dispatch(updateClient(selectedClient._id, clientData, clientData?.role, setOpen));
    } else {
        dispatch(createClient(clientData, setOpen));
    }
    setClientData(initialClientState)
  };

  const handleChange = (field, value) => {
    setClientData((prevFilters) => ({ ...prevFilters, [field]: value, }));
    // Clear error for that field as user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setClientData(initialClientState)
    setErrors({})
  };

  return open && (
    <div>
      <Dialog
        scroll={scroll}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">{isEdit ? 'Edit Client' : 'Add New Client'}</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Client Detail</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Client Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.firstName}
                    // key for Client Name should be clientName
                    // I think we just copy pasted the code from CreateEmployee.jsx
                    // and forgot to change the key
                    onChange={(e) => handleChange('firstName', e.target.value)} 
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    FormHelperTextProps={{
                      sx: { marginLeft: 0 }  // removes left padding
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Client Username </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    FormHelperTextProps={{
                      sx: { marginLeft: 0 }  // removes left padding
                    }}
                  />
                </td>
              </tr>
              {/* <tr>
                <td className="pb-4 text-lg">User Name </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    FormHelperTextProps={{
                      sx: { marginLeft: 0 }  // removes left padding
                    }}
                  />
                </td>
              </tr> */}
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    value={clientData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone}
                    FormHelperTextProps={{
                      sx: { marginLeft: 0 }  // removes left padding
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={clientData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    FormHelperTextProps={{
                      sx: { marginLeft: 0 }  // removes left padding
                    }}
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? 'Submitting...' : 'Submit'}
          </button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default CreateClient;
