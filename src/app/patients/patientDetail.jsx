"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const schema = yup
  .object({
    name: yup.string().required("Please enter a name"),
    email: yup.string().email().required("Please enter an email address"),
  })
  .required();

export default function PatientDetail({handleIsAddClose}) {
  const [urole, setUrole] = useState("Patient");

  const { register, handleSubmit,formState: { errors },} = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    Object.assign(data, { role: urole });

    console.log(data);

    axios
      .post("api/users", JSON.stringify(data))

      .then((response) => {
         console.log('data', response);
        toast.success("Created sucessfully !", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
        });
        handleIsAddClose();
      })
      .catch((error) => {
        console.log("err", error);
        toast.error("Can't add!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleChange = (event) => {
    setUrole(event.target.value);
  };

  return (
    <>
     <div className="flex justify-start">
                <h2 className="font-bold mb-4">Patients</h2>
                <ArrowBackIcon className="mt-8 -ml-16 mb-2"
                  onClick={() => handleIsAddClose()}
                  variant="outlined" />
              
       </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <TextField
              fullWidth
              size="small"
              label="Name"
              {...register("name")}
              variant="outlined"
            />
            <p className="text-orange-600 text-xs ml-1">
              {errors.name?.message}
            </p>
          </div>
          <div>
            <TextField
              fullWidth
              size="small"
              {...register("email")}
              label="Email"
              variant="outlined"
            />
            <p className="text-orange-600 text-xs ml-1 ">
              {errors.email?.message}
            </p>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                size="small"
                value={urole}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="Patient">Patient</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="mt-2 flex-end">
          <Button className="mt-2" type="submit" variant="outlined">
            SAVE
          </Button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}
