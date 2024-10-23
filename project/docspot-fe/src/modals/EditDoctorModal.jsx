import { Button, Form, Modal } from "react-bootstrap";
import { updateDoctorApi } from "../api/doctor";
import * as formik from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const EditDoctorModal = ({ show, close, data }) => {
  console.log(data);
  const { Formik } = formik;

  const schema = yup.object().shape({
    status: yup.string().required(),
  });

  const handleChange = (e) => {};

  const handleSubmit = async (updateData) => {
    const response = await updateDoctorApi(data.id, updateData);
    if (response.status === 200) {
      toast.success("Doctor Updated successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      close();
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        status: data?.doctorInfo?.status,
      }}
      enableReinitialize
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          {data && (
            <Modal show={show} onHide={close}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Doctor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mt-4">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <option value="">Set Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
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

export default EditDoctorModal;
