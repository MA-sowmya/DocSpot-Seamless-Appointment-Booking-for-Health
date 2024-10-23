import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Form,
  Button,
  Row,
  Col,
  Container,
  Modal,
} from "react-bootstrap";

import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { updateDoctorApi } from "../api/doctor";
import moment from "moment";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultTimeSlots = [
  { period: "Morning", startTime: "08:00AM", endTime: "12:00PM" },
  { period: "Afternoon", startTime: "12:00PM", endTime: "05:00PM" },
  { period: "Evening", startTime: "7:00PM", endTime: "10:00PM" },
];

const EditDoctorAvailabilityModal = ({ show, close, data }) => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [availability, setAvailability] = useState(data?.availability);

  useEffect(() => {
    if (!data || !data.availability.length) {
      const newAvailability = daysOfWeek.map((day) => {
        return { day: day, dayOff: true, timeSlots: [] };
      });
      setAvailability(newAvailability);
    }
  }, [data]);

  const handleTabChange = (key) => {
    setSelectedDay(key);
  };

  const handleDayOffChange = (index) => (event) => {
    const dayOff = event.target.checked;
    let newAvailability = [...availability];

    if (!dayOff && !availability[index]?.timeSlots.length) {
      newAvailability[index].timeSlots = defaultTimeSlots;
    } else if (dayOff) {
      newAvailability[index].timeSlots = [];
    }
    newAvailability[index].dayOff = event.target.checked;

    setAvailability(newAvailability);
  };

  const handleTimeChange = (index, slotIndex, field) => (event) => {
    const newAvailability = [...availability];
    newAvailability[index].timeSlots[slotIndex][field] = moment(
      event.target.value,
      "HH:mm"
    ).format("hh:mmA");
    setAvailability(newAvailability);
  };

  const handleSlotChange = (index, slotIndex, field) => (event) => {
    const newAvailability = [...availability];
    newAvailability[index].timeSlots[slotIndex][field] = event.target.value;
    setAvailability(newAvailability);
  };

  const handleSubmit = async () => {
    const reqData = { availability: availability };
    const response = await updateDoctorApi(data.doctorId, reqData);
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
    <>
      {data && (
        <Modal
          show={show}
          onHide={close}
          size="lg"
          dialogClassName="editAvail-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Availability</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container fluid>
              <Tabs
                activeKey={selectedDay}
                onSelect={handleTabChange}
                className="mb-3"
              >
                {daysOfWeek.map((day, index) => (
                  <Tab key={day} eventKey={day} title={day}>
                    <div style={{ padding: "20px" }}>
                      <Form>
                        <Form.Check
                          type="checkbox"
                          label="Day Off"
                          checked={availability[index]?.dayOff}
                          onChange={handleDayOffChange(index)}
                        />

                        {!availability[index]?.dayOff &&
                          availability[index]?.timeSlots.map(
                            (slot, slotIndex) => (
                              <div key={slot.period} className="mb-3">
                                <h5>{slot.period}</h5>
                                <Row>
                                  <Col>
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control
                                      type="time"
                                      min={
                                        slot.period === "Morning"
                                          ? "08:00"
                                          : slot.period === "Afternoon"
                                          ? "12:00"
                                          : "17:00"
                                      }
                                      max={
                                        slot.period === "Morning"
                                          ? "12:00"
                                          : slot.period === "Afternoon"
                                          ? "17:00"
                                          : "21:00"
                                      }
                                      value={moment(
                                        slot.startTime,
                                        "hh:mmA"
                                      ).format("HH:mm")}
                                      onChange={handleTimeChange(
                                        index,
                                        slotIndex,
                                        "startTime"
                                      )}
                                    />
                                  </Col>
                                  <Col>
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control
                                      type="time"
                                      min={
                                        slot.period === "Morning"
                                          ? "08:00"
                                          : slot.period === "Afternoon"
                                          ? "12:00"
                                          : "17:00"
                                      }
                                      max={
                                        slot.period === "Morning"
                                          ? "12:00"
                                          : slot.period === "Afternoon"
                                          ? "17:00"
                                          : "21:00"
                                      }
                                      value={moment(
                                        slot.endTime,
                                        "hh:mmA"
                                      ).format("HH:mm")}
                                      onChange={handleTimeChange(
                                        index,
                                        slotIndex,
                                        "endTime"
                                      )}
                                    />
                                  </Col>
                                </Row>
                              </div>
                            )
                          )}
                      </Form>
                    </div>
                  </Tab>
                ))}
              </Tabs>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-end gap-3">
              <Button variant="secondary" onClick={close}>
                CLOSE
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Submit Availability
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EditDoctorAvailabilityModal;
