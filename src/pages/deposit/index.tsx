import { Badge, Button, Card, Col, Container, Form, InputGroup, Row, Table, Toast, ToastContainer } from "react-bootstrap";
import { PiMoneyBold } from "react-icons/pi";
import { FaCopy } from "react-icons/fa";
import QRCode from "react-qr-code";
import { useState } from "react";
import PaginationCompoent from "../../components/pagination";

const Deposit = () => {
  const [showToast, setToast] = useState(false);
  const [depositAddress, setDepositAddress] = useState("0xf0E4163f0811A1427829D0172F5241A03FaA987d");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(depositAddress);
    setToast(true);
  }
  return (
    <Container>
        <h1>Deposit</h1>
        <hr className="page-underline"/>

        <Card>
          <Card.Body>
            <Row>
              <Col xs={4}></Col>
              <Col xs={4}>
                <Card.Title>Bitcoin(BTC)</Card.Title>

                <div className="d-flex justify-content-between">
                  <Card.Text>Time to Fund:</Card.Text>
                  <Card.Text className="font-weight-bold">1 minutes</Card.Text>
                </div>
                <div className="d-flex justify-content-between">
                  <Card.Text>Min. Deposit:</Card.Text>
                  <Card.Text className="font-weight-bold">0.00000001 BTC</Card.Text>
                </div>
                <div className="d-flex justify-content-between">
                  <Card.Text>Max. Deposit:</Card.Text>
                  <Card.Text className="font-weight-bold">No limit</Card.Text>
                </div>
                <div className="d-flex justify-content-between">
                  <Card.Text>Fee:</Card.Text>
                  <Card.Text className="font-weight-bold">Free</Card.Text>
                </div>
              </Col>
              <Col xs={4}></Col>
            </Row>
            <Row>
              <Col xs={4}></Col>
              <Col xs={4}>
                <div className="qr-code-panel">
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={depositAddress}
                    viewBox={`0 0 256 256`}
                  />
                </div>
                <InputGroup>
                    <Form.Control aria-label="Deposit Address" value={depositAddress} />
                    <InputGroup.Text><FaCopy onClick={copyToClipboard}/></InputGroup.Text>
                  </InputGroup>
                <Button variant="primary" className="icon-btn w-100 mt-2"><PiMoneyBold size={18}/> Deposit</Button>
              </Col>
              <Col xs={4}></Col>
            </Row>

            <hr/>

            <h2 className="page-sub-title">History</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="text-right">Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>1.223 BTC</td>
                    <td>04/01/2024</td>
                    <td><Badge bg="primary">Success</Badge></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>0.0223 BTC</td>
                    <td>12/04/2024</td>
                    <td><Badge bg="danger">Failed</Badge></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>1.223 BTC</td>
                    <td>04/01/2024</td>
                    <td><Badge bg="primary">Success</Badge></td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>0.2223 BTC</td>
                    <td>11/04/2023</td>
                    <td><Badge bg="danger">Failed</Badge></td>
                  </tr>
                </tbody>
              </Table>

              <PaginationCompoent />
          </Card.Body>
        </Card>

       

        <ToastContainer
          className="p-3"
          position={"bottom-center"}
          style={{ zIndex: 1 }}
          
        >
          <Toast onClose={() => setToast(false)} show={showToast} delay={3000} autohide animation={true} bg={"Success"}>
            <Toast.Body className="text-center">Copied to clipboard!</Toast.Body>
          </Toast>
        </ToastContainer>
    </Container>
  );
};

export default Deposit;
