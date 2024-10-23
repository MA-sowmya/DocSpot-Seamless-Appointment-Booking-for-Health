import { useContext, useEffect, useState } from "react";
import TableViewComp from "../components/TableViewComp";
import { Chip, IconButton } from "@mui/material";
import { appointmentsApi } from "../api/appointments";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import EditAppointmentModal from "../modals/EditAppointmentModal";
import AppointmentsCardComp from "../components/AppointmentsCardComp";
import { capitalize } from "../utils/convert";
import { UserContext } from "../context/UserContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
const Appointments = () => {
  const navigate = useNavigate();
  const [editAppointmentModal, seteditAppointmentModal] = useState(false);

  const [selectedAppointmentId, setselectedAppointmentId] = useState(null);

  const { isPatient } = useContext(UserContext);

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onView(params.row.id)}>
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: "patientName",
      headerName: "Patient Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      flex: 1,
    },
    {
      field: "appointmentDate",
      headerName: "Appointment Date",
      flex: 1,
    },
    { field: "appointmentTime", headerName: "Appointment Time", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row.status === "scheduled" && (
            <Chip
              label="Scheduled"
              style={{
                backgroundColor: "#FFC107",
                color: "white",
                borderColor: "#FFC107",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
          {params.row.status === "confirmed" && (
            <Chip
              label="Confirmed"
              style={{
                backgroundColor: "green",
                color: "white",
                borderColor: "green",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
          {params.row.status === "cancelled" && (
            <Chip
              label="Cancelled"
              style={{
                backgroundColor: "red",
                color: "white",
                borderColor: "red",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
          {params.row.status === "rescheduled" && (
            <Chip
              label="Rescheduled"
              style={{
                backgroundColor: "blue",
                color: "white",
                borderColor: "blue",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
          {params.row.status === "checkedIn" && (
            <Chip
              label="Checked In"
              style={{
                backgroundColor: "purple",
                color: "white",
                borderColor: "blue",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
          {params.row.status === "noshow" && (
            <Chip
              label="No Show"
              style={{
                backgroundColor: "#FF5722",
                color: "white",
                borderColor: "#FF5722",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
          {params.row.status === "completed" && (
            <Chip
              label="Completed"
              style={{
                backgroundColor: "gray",
                color: "white",
                borderColor: "gray",
              }}
              onClick={() => onEdit(params.row.id)}
            />
          )}
        </>
      ),
      valueGetter: (value, row) => `${capitalize(row.status)}`,
    },
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
    },
  ];

  const onEdit = async (id) => {
    setselectedAppointmentId(id);
    seteditAppointmentModal(true);
  };

  const handleClose = () => {
    seteditAppointmentModal(false);
    getAppointments();
  };

  const onView = (id) => {
    navigate(`/confirmation/${id}`);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    const response = await appointmentsApi();
    if (response.status === 200) {
      const rows = response.data.data;
      let data = rows.map((d) => {
        return {
          id: d.id,
          patientName: `${d.patientInfo.firstname} ${d.patientInfo.lastname}`,
          appointmentDate: moment(d.appointmentDate).utc().format("DD-MM-YYYY"),
          appointmentTime: d.timeSlot,
          status: d.status,
          doctorName: capitalize(d.doctorInfo.name),
          experience: d?.doctorInfo.experience,
          gender: d?.patientInfo.gender,
        };
      });
      toast.success("Appointments Fetched successfully!", {
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
      {!isPatient && (
        <TableViewComp name="Appointments" rows={rows} columns={columns} />
      )}
      {isPatient && (
        <AppointmentsCardComp appointments={rows}></AppointmentsCardComp>
      )}

      <EditAppointmentModal
        show={editAppointmentModal}
        close={handleClose}
        id={selectedAppointmentId}
      ></EditAppointmentModal>
    </>
  );
};

export default Appointments;
