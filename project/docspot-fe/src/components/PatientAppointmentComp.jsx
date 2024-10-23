import { useEffect } from "react";

useEffect(() => {
  getMyAppointments();
}, []);

function getMyAppointments() {
  const response = this.appointmentsApi();

  if (response.status === 200) {
    const data = response.data.data;
    console.log(data);
  }
}

const PatientAppointmentComp = () => {
  return <h1>Patient</h1>;
};

export default PatientAppointmentComp;
