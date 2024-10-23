import { useEffect, useState } from "react";
import TableViewComp from "../components/TableViewComp";
import { usersApi } from "../api/user";
import { Chip } from "@mui/material";
import { useLoading } from "../context/LoaderContext";

const Users = () => {
  const { showLoader, hideLoader } = useLoading();

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
    { field: "phonenumber", headerName: "Phonenumber", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      valueGetter: (value, row) => `${row.active ? "Active" : "Inactive"}`,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.role === "admin" && (
            <Chip
              label="Admin"
              variant="outlined"
              style={{ color: "blue", borderColor: "blue" }}
            />
          )}
          {params.row.role === "patient" && (
            <Chip
              label="Patient"
              variant="outlined"
              style={{ color: "gray", borderColor: "gray" }}
            />
          )}
          {params.row.role === "doctor" && (
            <Chip
              label="Doctor"
              variant="outlined"
              style={{ color: "green", borderColor: "green" }}
            />
          )}
        </>
      ),
    },
  ];

  const onRemove = (id) => {
    console.log(id);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await usersApi(showLoader, hideLoader);
      if (response.status === 200) {
        const rows = response.data.data;
        setRows(rows);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <TableViewComp name="Users" rows={rows} columns={columns} />
    </>
  );
};

export default Users;
