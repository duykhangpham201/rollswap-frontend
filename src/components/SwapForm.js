import React, { useState, useEffect } from "react";
import { Form, Container, Card, Button, Row, Col } from "react-bootstrap";
import { ethers } from "ethers";
import { PAIR_CONTRACT } from "../utils/constants";

const SwapForm = ({ address, RollswapPair, Ohm, Time }) => {
  const [token0, setToken0] = useState(null);
  const contractAddress = PAIR_CONTRACT;
  const [allowance, setAllowance] = useState("unapproved");
  const maxUint256 = 100;

  const approveHandler = async (e) => {
    try {
      e.preventDefault();
      await Ohm.approve(
        contractAddress,
        ethers.utils.parseEther(maxUint256.toString())
      );

      await Time.approve(
        contractAddress,
        ethers.utils.parseEther(maxUint256.toString())
      );
    } catch (error) {
      console.log(error);
    }
  };

  const swap = async (e) => {
    try {
      e.preventDefault();
      await RollswapPair.swapToken0forToken1(
        ethers.utils.parseEther(token0.toString())
      );
      console.log("Swapped!");
    } catch (error) {
      console.log(error);
    }
  };

  const checkAllowance = async () => {
    try {
      const OhmAllow = await Ohm.allowance(contractAddress, address);
      const TimeAllow = await Time.allowance(contractAddress, address);
      if (OhmAllow !== 0 && TimeAllow !== 0) {
        setAllowance("approved");
      }
      console.log(allowance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAllowance();
  });
  return (
    <Card>
      <Form onSubmit={swap}>
        <Container className="pt-2">
          <h4>Swap Ohm for Time</h4>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="0.0"
              onChange={(e) => setToken0(e.target.value)}
            />
          </Form.Group>
          <div className="mb-2">
            <Row>
              <Col xs={3}>
                <Button variant="success" type="submit" class>
                  Swap
                </Button>
              </Col>
              <Col xs={4}></Col>
              <Col xs={3}>
                <Button onClick={approveHandler}>Approve</Button>
              </Col>
            </Row>
          </div>
        </Container>
      </Form>
    </Card>
  );
};

export default SwapForm;
