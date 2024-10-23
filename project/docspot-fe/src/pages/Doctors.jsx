import { useContext, useEffect, useState } from "react";
import TableViewComp from "../components/TableViewComp";
import { usersByIdApi, usersByRoleApi } from "../api/user";
import { Chip, Switch } from "@mui/material";
import EditDoctorModal from "../modals/EditDoctorModal";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { updateDoctorApi } from "../api/doctor";

const Doctors = () => {
  const { isAdmin } = useContext(UserContext);
  const [editDoctorModal, seteditDoctorModal] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({});
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
    },
    { field: "specialization", headerName: "Specialization", flex: 1 },
    { field: "experience", headerName: "Experience", flex: 1 },
    { field: "fee", headerName: "Fee", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.status === "pending" && (
            <Chip
              label="Pending"
              style={{
                backgroundColor: "#FFC107",
                color: "white",
                borderColor: "#FFC107",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
          {params.row.status === "approved" && (
            <Chip
              label="Approved"
              style={{
                backgroundColor: "green",
                color: "white",
                borderColor: "green",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
          {params.row.status === "rejected" && (
            <Chip
              label="Rejected"
              style={{
                backgroundColor: "red",
                color: "white",
                borderColor: "red",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
        </>
      ),
    },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
      renderCell: (params) => (
        <>
          <Switch
            checked={params.row.active}
            onChange={() => onActive(params.row.id)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const onActive = async (id) => {
    // setRows((prevData) =>
    //   prevData.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    // );
    // const row = rows
    //   .filter((r) => r.id === id)
    //   .map((a) => {
    //     console.log(a);
    //     return { active: a.active };
    //   });
    // const data = { active: true };
    // const response = await updateDoctorApi(id, data);
    // if (response.status === 200) {
    //   const message = data.active ? "Activated" : "Deactivated";
    //   toast.success(`Doctor ${message} Successfully!`, {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //   });
    //   getUsers();
    // }
  };
  const onEdit = async (id) => {
    if (isAdmin) {
      const doctor = await getDoctor(id);
      setDoctorInfo(doctor);
      seteditDoctorModal(true);
    }
  };

  const handleClose = () => {
    seteditDoctorModal(false);
    getUsers();
  };

  const onRemove = (id) => {
    console.log(id);
  };

  const getDoctor = async (id) => {
    const response = await usersByIdApi(id);
    if (response.status === 200) {
      return response.data.data;
    }
  };

  const getUsers = async () => {
    const response = await usersByRoleApi("doctor");
    if (response.status === 200) {
      const rows = response.data.data;
      const data = rows.map((r) => {
        return {
          id: r.doctorInfo.doctorId,
          name: r.doctorInfo.name,
          specialization: r.doctorInfo.specialization,
          experience: r.doctorInfo.experience,
          fee: r.doctorInfo.fee,
          status: r.doctorInfo.status,
        };
      });
      toast.success("Doctor Fetched successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setRows(data);
    }
  };

  return (
    <>
      <TableViewComp name="Doctors" rows={rows} columns={columns} />
      <EditDoctorModal
        show={editDoctorModal}
        close={handleClose}
        data={doctorInfo}
      ></EditDoctorModal>
    </>
  );
};

export default Doctors;
