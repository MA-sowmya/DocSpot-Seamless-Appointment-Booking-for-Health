import { useEffect, useState } from "react";
import TableViewComp from "../components/TableViewComp";
import { usersByRoleApi } from "../api/user";
import { toast } from "react-toastify";
import { capitalize } from "@mui/material";

const Patients = () => {
  const columns = [
    // { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
      valueGetter: (value, row) =>
        `${row.firstname || ""} ${row.lastname || ""}`,
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      valueGetter: (value, row) => `${capitalize(row.gender)}`,
    },
    { field: "phonenumber", headerName: "Phonenumber", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      valueGetter: (value, row) => `${row.active ? "Active" : "Inactive"}`,
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await usersByRoleApi("patient");
    if (response.status === 200) {
      const rows = response.data.data;
      toast.success("Patients Fetched successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setRows(rows);
    }
  };
  return (
    <>
      <TableViewComp name="Patients" rows={rows} columns={columns} />
    </>
  );
};

export default Patients;
