import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { format } from "date-fns";
import { get } from "https";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import PatientDetail from "./patientDetail";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  const handleIsAddClose = () => {setIsAdd(false)};


  useEffect(() => {
    getData();
  }, [isAdd]);

  const getData = () => {
    axios
      .get("api/users")

      .then((response) => {
        // console.log('data', response);
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editRecord = (row) => {
    console.log("row ", row);
  };

  const deleteRecord = (row) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteRow(row),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteRow = (row) => {
    let data = JSON.stringify({ id: row.id });

    let config = {
      method: "delete",
      url: "api/users",
      data: data,
    };

    axios
      .request(config)

      .then((response) => {
        getData();
        toast.success("deleted sucessfully !", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // console.log('data', response);
        // setData(response.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log("err", error);
        toast.error("Can't delete", {
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

  const dateFormatter = (dateString) => {
    const parsedDate = new Date(dateString);
    return format(parsedDate, "MMMM d, yyyy h:mm a");
  };

  return (
    <> <ToastContainer />
      {isAdd ? (
        <PatientDetail  handleIsAddClose = {handleIsAddClose}/>
      ) : (
        <>
         <div className="flex justify-between">
                <h2 className="font-bold mb-4">Patients</h2>
                <Button className="mb-2" onClick={() => setIsAdd(true)} variant="outlined"  startIcon={<AddIcon />}  >
                  Add patient
                </Button>
              </div>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right" style={{ minWidth: 70 }}>
                      ID
                    </TableCell>

                    <TableCell align="right" style={{ minWidth: 170 }}>
                      Name
                    </TableCell>

                    <TableCell align="right" style={{ minWidth: 170 }}>
                      Email
                    </TableCell>

                    <TableCell align="right" style={{ minWidth: 170 }}>
                      Role
                    </TableCell>

                    <TableCell align="right" style={{ minWidth: 170 }}>
                      Created at
                    </TableCell>

                    <TableCell align="center" style={{ minWidth: 170 }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          <TableCell key={index} align="right">
                            {row.id}
                          </TableCell>
                          <TableCell key={index} align="right">
                            {row.name}
                          </TableCell>
                          <TableCell key={index} align="right">
                            {row.email}
                          </TableCell>
                          <TableCell key={index} align="right">
                            {row.type}
                          </TableCell>
                          <TableCell key={index} align="right">
                            {dateFormatter(row.created_at)}
                          </TableCell>
                          <TableCell key={index} align="right">
                            <div className="flex justify-center">
                              <div
                                className="cursor-pointer text-green-700 mr-2"
                                onClick={() => editRecord(row)}
                              >
                                <EditIcon />
                              </div>
                              <div
                                className="cursor-pointer text-orange-700"
                                onClick={() => deleteRecord(row)}
                              >
                                <DeleteIcon />
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}

     
    </>
  );
}
