import { doc, runTransaction } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

const FormGroup = ({ label, placeholder, name, value, onChange }) => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );
};

const EmployeeAdd = () => {
  const history = useHistory();
  const [details, setDetails] = useState({
    name: "",
    address: "",
    mobileNo: "",
    age: "",
    gender: "",
    email: "",
    position: "",
    salary: "",
  });

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleCreate = async () => {
    setShowSuccessMsg(false);
    const employeeCounterDocRef = doc(db, "counters", "employees");
    try {
      await runTransaction(db, async (transaction) => {
        const employeeCounterDoc = await transaction.get(employeeCounterDocRef);
        const newCount = employeeCounterDoc.data().count + 1;
        let concat = "00000000" + newCount;
        transaction.set(
          doc(db, "employees", "EM" + concat.substring(concat.length - 8)),
          details
        );
        transaction.update(employeeCounterDocRef, { count: newCount });
      });
      setShowSuccessMsg(true);
      clear();
    } catch (e) {
      console.error(e);
    }
  };

  const clear = () =>
    setDetails({
      name: "",
      address: "",
      mobileNo: "",
      age: "",
      gender: "",
      email: "",
      position: "",
      salary: "",
    });

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Add Employee
          </Card.Header>
          <Card.Body>
            <Form>
              <FormGroup
                label="Name"
                placeholder="Name"
                name="name"
                value={details.name}
                onChange={setValue}
              />

              <FormGroup
                label="Address"
                placeholder="Address"
                name="address"
                value={details.address}
                onChange={setValue}
              />

              <FormGroup
                label="Mobile"
                placeholder="Mobile Number"
                name="mobileNo"
                value={details.mobileNo}
                onChange={setValue}
              />

              <FormGroup
                label="Age"
                placeholder="Age"
                name="age"
                value={details.age}
                onChange={setValue}
              />

              <FormGroup
                label="Gender"
                placeholder="Gender"
                name="gender"
                value={details.gender}
                onChange={setValue}
              />

              <FormGroup
                label="Email"
                placeholder="Email"
                name="email"
                value={details.email}
                onChange={setValue}
              />

              <FormGroup
                label="Position"
                placeholder="Position"
                name="position"
                value={details.position}
                onChange={setValue}
              />

              <FormGroup
                label="Salary"
                placeholder="Salary"
                name="salary"
                value={details.salary}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 5, offset: 2 }}>
                  <Button variant="success" onClick={handleCreate}>
                    Create
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push("/employee")}
                    style={{ marginLeft: 48 }}
                  >
                    <i className="bi bi-arrow-left"></i>&nbsp; Go Back
                  </Button>
                </Col>
              </Form.Group>
              {showSuccessMsg && (
                <Alert variant="success">Employee successfully added !</Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EmployeeAdd;
