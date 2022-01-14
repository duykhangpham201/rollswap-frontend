import React, { useState } from "react";
import { Container, Col, Row, ButtonGroup, Button } from "react-bootstrap";
import SwapForm from "../components/SwapForm";
import ProvideForm from "../components/ProvideForm";
import WithdrawForm from "../components/WithdrawForm";

const MainScreen = () => {
  const [form, setForm] = useState("swap");

  const renderContent = () => {
    if (form === "swap") {
      return <SwapForm />;
    } else if (form === "provide") {
      return <ProvideForm />;
    } else if (form === "withdraw") {
      return <WithdrawForm />;
    }
  };

  return (
    <div>
      <Container className="pt-2">
        <Row style={{ alignItem: "center", textAlign: "center" }}>
          <Col xs={{ span: 4, offset: 4 }}>
            <ButtonGroup>
              <Button variant="light" onClick={() => setForm("swap")}>
                Swap
              </Button>
              <Button variant="light" onClick={() => setForm("provide")}>
                Provide
              </Button>
              <Button variant="light" onClick={() => setForm("withdraw")}>
                Withdraw
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
        <br />
        <Row className="pt-4">
          <Col xs={{ span: 4, offset: 4 }}>{renderContent()}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
