import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import femaleImg from "../assets/images/female.png";
import maleImg from "../assets/images/male.png";
import { useContext, useEffect, useRef, useState } from "react";
import * as formik from "formik";
import * as yup from "yup";
import {
  availableAppointmentsApi,
  bookAppointmentsApi,
  reScheduleAppointmentsApi,
} from "../api/appointments";
import DatePicker from "react-datepicker";
import moment from "moment";
import "../styles/BookAppointment.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const BookAppointmentModal = ({ show, close, rebook, slotReq }) => {
  const { Formik } = formik;
  const navigate = useNavigate();
  const formikRef = useRef(null);
  const { userId } = useContext(UserContext);

  const schema = yup.object().shape({
    appointmentDate: yup.string().required(),
    reasonForVisit: yup.string().notRequired(),
    slot: yup.string().required("pick the slot"),
  });
  const [time, setTime] = useState({});
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);
  const [data, setModalData] = useState(null);

  useEffect(() => {
    getAvailableAppoitments();
  }, [show]);

  const getAvailableAppoitments = async () => {
    const response = await availableAppointmentsApi(
      slotReq?.doctor?.doctorId,
      slotReq?.date
    );

    if (response.status === 200) {
      const slots = response.data.data;
      let doctorSlots = {
        name: slotReq?.doctor.name,
        doctorId: slotReq?.doctor.doctorId,
        patientId: userId,
        specialization: slotReq?.doctor.specialization,
        date: moment().utc(slotReq?.date),
        timeSlots: Object.keys(slots).length ? slots : [],
        gender: "male",
        experience: slotReq?.doctor?.experience,
      };
      setModalData(doctorSlots);
    }
  };

  const onDateChange = (date, setFieldValue) => {
    date = moment.utc(date).format("DD-MM-YYYY");
    setFieldValue("date", date);
    getAvailableAppoitments();
  };

  const onTimeClick = (tObj, setFieldValue) => {
    if (tObj.time !== time.time) {
      setTime(tObj);
      setFieldValue("slot", tObj.time);
      setSelectedTimeIndex(tObj.index);
    } else {
      setTime({});
      setFieldValue("slot", "");
      setSelectedTimeIndex(null);
    }
  };

  const handleChange = (e) => {
    console.log(e);
  };

  const handleSubmit = async (formData) => {
    const req = {
      doctorId: data.doctorId,
      patientId: data.patientId,
      reasonForVisit: formData.reasonForVisit ?? slotReq?.reasonForVisit,
      appointmentDate: formData.date,
      timeSlot: time.time,
      period: time.period,
  
    };
    toast.success("Appointment Booked successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
    });


    if (rebook) {
      req.status = "rescheduled";
      reschedule(req);
    } else {
      schedule(req);
    }
  };

  const schedule = async (req) => {
    const response = await bookAppointmentsApi(req);
    if (response.status === 201) {
      const appointment = response.data.data;
      const appointmentId = appointment.id;
      navigate(`/confirmation/${appointmentId}`);
    }
  };

  const reschedule = async (req) => {
    const response = await reScheduleAppointmentsApi(
      slotReq?.appointmentId,
      req
    );
    if (response.status === 200) {
      const appointment = response.data.data;
      const appointmentId = appointment.id;
      toast.success("Appointment Updated successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      close();
      navigate(`/confirmation/${appointmentId}`);
    } else {
      toast.error("Appointment Cannot be Updated!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={close}
        data={data}
        size="lg"
        dialogClassName="book-modal"
      >
        <Formik
          innerRef={formikRef}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={{
            date: moment
              .utc(slotReq.date.toLocaleString())
              .format("MM/DD/YYYY"),
            reasonForVisit: "",
            slot: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            setFieldValue,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>BOOK AN APPOINTMENT</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Row>
                  <Col xs={4} md={2}>
                    <img
                      src={data?.gender === "female" ? femaleImg : maleImg}
                      alt={data?.name}
                      className="img-fluid rounded-circle"
                    />
                  </Col>
                  <Col xs={8} md={9}>
                    <Card.Body className="mt-1">
                      <Card.Title>Dr. {data?.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {data?.specialization}
                      </Card.Subtitle>
                      <Card.Text>Experience: {data?.experience} Yrs</Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Form.Group className="d-flex flex-column ">
                    <Form.Label>Appointment Date</Form.Label>
                    <DatePicker
                      selected={values?.date}
                      onChange={(date) => onDateChange(date, setFieldValue)}
                      className="form-control"
                      placeholderText="Select a date"
                      dateFormat="d-MM-YYYY"
                    />
                  </Form.Group>
                </div>
                <div className="mt-4">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Reason for visit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Fever, Cold ...."
                      name="reasonForVisit"
                      value={values?.reasonForVisit}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
                <div>
                  <h5>Available appointments</h5>
                  <span>Click a time to select time slot</span>
                </div>

                {data?.timeSlots?.map((d) => (
                  <div className="mt-2">
                    <h6>{d.period}</h6>
                    <div className="d-flex justify-content-start gap-2 flex-wrap">
                      {d.availableSlots.map((s, i) => (
                        <div
                          className={`time-chip ${
                            selectedTimeIndex === `${d.period}${i}`
                              ? "active"
                              : "inactive"
                          }`}
                          key={`${s.period}${i}`}
                          onClick={() =>
                            onTimeClick(
                              {
                                time: s,
                                period: d.period,
                                index: `${d.period}${i}`,
                              },
                              setFieldValue
                            )
                          }
                        >
                          <div className="d-flex">{s}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {!data?.timeSlots?.length && (
                  <>
                    <p className="mt-2">
                      No Slots Available. Please search for other dates
                    </p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                  CLOSE
                </Button>
                <Button variant="primary" type="submit">
                  BOOK APPOINTMENT
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default BookAppointmentModal;
