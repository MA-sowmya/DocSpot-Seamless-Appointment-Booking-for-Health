import React, { useState } from "react";
import { Tabs, Tab, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const defaultTimeSlots = [
  { period: "Morning", startTime: "08:00", endTime: "12:00", maxSlots: 3 },
  { period: "Afternoon", startTime: "12:00", endTime: "17:00", maxSlots: 3 },
  { period: "Evening", startTime: "17:00", endTime: "21:00", maxSlots: 3 },
];

const DoctorAvailability = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [availability, setAvailability] = useState(
    daysOfWeek.map(() => ({
      isOff: false,
      timeSlots: [...defaultTimeSlots],
    }))
  );

  const handleTabChange = (key) => {
    setSelectedDay(key);
  };

  const handleDayOffChange = (index) => (event) => {
    const newAvailability = [...availability];
    newAvailability[index].isOff = event.target.checked;
    setAvailability(newAvailability);
  };

  const handleTimeChange = (index, slotIndex, field) => (event) => {
    const newAvailability = [...availability];
    newAvailability[index].timeSlots[slotIndex][field] = event.target.value;
    setAvailability(newAvailability);
  };

  const handleSlotChange = (index, slotIndex, field) => (event) => {
    const newAvailability = [...availability];
    newAvailability[index].timeSlots[slotIndex][field] = event.target.value;
    setAvailability(newAvailability);
  };

  const handleSubmit = () => {
    // Process availability data here
    // console.log("Doctor availability:", availability);
  };

  return (
    <div className="container">
      <Tabs activeKey={selectedDay} onSelect={handleTabChange} className="mb-3">
        {daysOfWeek.map((day, index) => (
          <Tab key={day} eventKey={day} title={day}>
            <div style={{ padding: "20px" }}>
              <Form>
                <Form.Check
                  type="checkbox"
                  label="Day Off"
                  checked={availability[index].isOff}
                  onChange={handleDayOffChange(index)}
                />

                {!availability[index].isOff &&
                  availability[index].timeSlots.map((slot, slotIndex) => (
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
                            value={slot.startTime}
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
                            value={slot.endTime}
                            onChange={handleTimeChange(
                              index,
                              slotIndex,
                              "endTime"
                            )}
                          />
                        </Col>
                        <Col>
                          <Form.Label>Max Slots</Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            value={slot.maxSlots}
                            onChange={handleSlotChange(
                              index,
                              slotIndex,
                              "maxSlots"
                            )}
                          />
                        </Col>
                      </Row>
                    </div>
                  ))}
              </Form>
            </div>
          </Tab>
        ))}
      </Tabs>

      <Button variant="primary" onClick={handleSubmit}>
        Submit Availability
      </Button>
    </div>
  );
};

export default DoctorAvailability;
