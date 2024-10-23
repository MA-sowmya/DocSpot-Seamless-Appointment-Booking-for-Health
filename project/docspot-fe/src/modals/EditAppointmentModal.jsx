import { Button, Card, Form, Image, Modal } from "react-bootstrap";
import * as formik from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { appointmentApi, updateAppointmentApi } from "../api/appointments";
import { useEffect, useState } from "react";

const defaultOptions = [
  { field: "scheduled", title: "Scheduled" },
  { field: "confirmed", title: "Confirmed" },
  { field: "checkedIn", title: "Checked In" },
  { field: "cancelled", title: "Cancelled" },
  { field: "noshow", title: "NoShow" },
];

const EditAppointmentModal = ({ show, close, id }) => {
  const [data, setData] = useState(null);
  const [statusOptions, setStatusOptions] = useState(defaultOptions);
  const { Formik } = formik;

  useEffect(() => {
    getAppointment(id);
  }, [id]);

  const schema = yup.object().shape({
    status: yup.string().required(),
  });

  const handleChange = (e) => {};

  const handleSubmit = async (updateData) => {
    const response = await updateAppointmentApi(id, updateData);
    if (response.status === 200) {
      toast.success("Appointment Updated successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      close();
    }
  };

  const getAppointment = async (id) => {
    if (id) {
      const response = await appointmentApi(id);
      if (response.status === 200) {
        const data = response.data.data;
        const status = data.status;

        let voidList = [];
        if (status === "confimed") {
          voidList = ["scheduled"];
        } else if (status === "checkedIn") {
          voidList = ["scheduled", "confirmed", "cancelled"];
        } else if (status === "cancelled") {
          voidList = ["scheduled", "confirmed", "checkedIn", "noshow"];
        } else if (status === "noshow") {
          voidList = ["scheduled", "confirmed", "checkedIn"];
        } else if (status === "completed") {
          voidList = ["scheduled", "confirmed", "checkedIn", "noshow"];
        }

        const validStatus = defaultOptions.filter(
          (s) => !voidList.includes(s.field)
        );
        setStatusOptions(validStatus);
        setData(data);
      }
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        status: data?.status,
      }}
      enableReinitialize
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          {statusOptions.length && (
            <Modal show={show} onHide={close}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Appoinment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mt-4">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                  >
                    {statusOptions.map((s, i) => (
                      <option key={i} value={s.field}>
                        {s.title}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                  CLOSE
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  SAVE
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EditAppointmentModal;
