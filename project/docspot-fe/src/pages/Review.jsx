import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavbarComp from "../components/NavbarComp";

const Review = () => {
  return (
    <>
      <NavbarComp />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col>
            <Card className="text-center shadow p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title as="h2" className="mb-4">
                  Account Under Review
                </Card.Title>
                <Card.Text>
                  Your account is currently under review by our admin team. This
                  process may take some time, and we appreciate your patience.
                  You will receive a notification once your account has been
                  approved.
                </Card.Text>
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={() => alert("Contact Support")}
                >
                  Contact Support
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Review;
