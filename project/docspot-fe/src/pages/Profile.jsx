import { Button, Card, Col, ListGroup, Row, Table } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { capitalize } from "../utils/convert";
import EditProfileModal from "../modals/EditProfileModal";
import moment from "moment";
import EditDoctorAvailabilityModal from "../modals/EditDoctorAvailabilityModal";

const Profile = () => {
  const { isDoctor } = useContext(UserContext);
  const { profile, getProfile } = useContext(UserContext);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [editAvailabilityModal, setEditAvailabilityModal] = useState(false);
  const [doctorData, setDoctorData] = useState(profile?.doctorInfo);
  const [showDoctorsColumn, setShowDoctorsColumn] = useState(false);

  useEffect(() => {
    isDoctor ? setShowDoctorsColumn(true) : setShowDoctorsColumn(false);
  }, [isDoctor]);

  const handleEditAvailability = () => {
    if (isDoctor) {
      setEditAvailabilityModal(true);
    }
  };

  const handleEditProfile = () => {
    setEditProfileModal(true);
  };

  const handleClose = () => {
    setEditProfileModal(false);
    getProfile();
  };

  const handleCloseAvailabilityModal = () => {
    setEditAvailabilityModal(false);
    getProfile();
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Header
          as="h2"
          className="text-uppercase text-center"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Profile Information
        </Card.Header>
        <Card.Body>
          {/* Doctor Information Card */}
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={showDoctorsColumn ? 6 : 12}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <strong>Name:</strong> {capitalize(profile.firstname)}{" "}
                          {capitalize(profile.lastname)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Role:</strong> {capitalize(profile.role)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Email:</strong> {profile.email}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Phone Number:</strong> {profile.phonenumber}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Gender:</strong> {profile.gender}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <strong>Date of Birth:</strong>{" "}
                          {moment(profile.dob).format("DD-MM-YYYY")}
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      {" "}
                      <ListGroup variant="flush">
                        {profile.role === "doctor" && (
                          <>
                            <ListGroup.Item>
                              <strong>Experience: </strong>
                              {profile.doctorInfo.experience}
                              <span> Yrs</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <strong>Specialization: </strong>
                              {capitalize(profile.doctorInfo.specialization)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              <strong>Fee: </strong>
                              {profile.doctorInfo.fee}
                            </ListGroup.Item>
                          </>
                        )}
                      </ListGroup>
                    </Col>
                  </Row>

                  <div className="mt-3">
                    <Button variant="primary" onClick={handleEditProfile}>
                      Edit Profile
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {profile?.doctorInfo?.availability && (
            <Row>
              <Col>
                <h4 className="mb-3">Availability</h4>
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Morning</th>
                      <th>Afternoon</th>
                      <th>Evening</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile?.doctorInfo?.availability.map((a) => (
                      <tr key={a.day}>
                        <td>{a.day}</td>
                        {a.timeSlots.map((d) => (
                          <td>{`${d.startTime} - ${d.endTime}`}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="primary" onClick={handleEditAvailability}>
                  Edit Availability
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
        <EditProfileModal show={editProfileModal} close={handleClose} />
        <EditDoctorAvailabilityModal
          show={editAvailabilityModal}
          close={handleCloseAvailabilityModal}
          data={doctorData}
        />
      </Card>
    </>
  );
};

export default Profile;
