import React, { useState } from "react";
import { Form, Container, Card, Button, Row, Col } from "react-bootstrap";
import abi from "../utils/RollswapPair.json";
import {
  PAIR_CONTRACT,
  OHM_CONTRACT,
  TIME_CONTRACT,
  tokenabi,
} from "../utils/constants";
import { ethers } from "ethers";

const ProvideForm = () => {
  const [token0, setToken0] = useState(null);
  const [token1, setToken1] = useState(null);

  const contractAddress = PAIR_CONTRACT;
  const contractABI = abi.abi;

  const ohmAddress = OHM_CONTRACT;
  const timeAddress = TIME_CONTRACT;

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const RollswapPair = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  const Ohm = new ethers.Contract(ohmAddress, tokenabi, signer);

  const Time = new ethers.Contract(timeAddress, tokenabi, signer);

  const provideLiquidity = async (e) => {
    try {
      e.preventDefault();

      await RollswapPair.addLiquidity(
        ethers.utils.parseEther(token0.toString()),
        ethers.utils.parseEther(token1.toString())
      );
      console.log("Provided!");
    } catch (error) {
      console.log(error);
    }
  };

  const approveHandler = async (e) => {
    try {
      e.preventDefault();
      await Ohm.approve(
        contractAddress,
        ethers.utils.parseEther(token0.toString())
      );

      await Time.approve(
        contractAddress,
        ethers.utils.parseEther(token1.toString())
      );
    } catch (error) {
      console.log(error);
    }
  };

  const allowanceHandler = async (e) => {
    try {
      e.preventDefault();
      const allow = await Ohm.allowance(
        "0x5d11161774511e1e2F59Bf15e55EDd9DF27898bA",
        contractAddress
      );
      console.log(allow / 10 ** 18);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <Form onSubmit={provideLiquidity}>
        <Container className="pt-2">
          <h4>Provide</h4>

          <Form.Group className="mb-3">
            <Form.Control
              placeholder="0.0"
              onChange={(e) => setToken0(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="0.0"
              onChange={(e) => setToken1(e.target.value)}
            />
          </Form.Group>
          <div className="mb-2">
            <Row>
              <Col xs={3}>
                <Button variant="success" type="submit" class>
                  Submit
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
      <Button onClick={allowanceHandler}>Get Allowance</Button>
    </Card>
  );
};

export default ProvideForm;
