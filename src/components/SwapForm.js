import React from "react";
import { Form, Container, Card, Button } from "react-bootstrap";

const SwapForm = () => {
  return (
    <Card>
      <Form>
        <Container className="pt-2">
          <h4>Swap</h4>

          <Form.Group className="mb-3">
            <Form.Control placeholder="0.0" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control placeholder="0.0" />
          </Form.Group>
          <div className="mb-2">
            <Button variant="success" type="submit" class>
              Swap
            </Button>
          </div>
        </Container>
      </Form>
    </Card>
  );
};

export default SwapForm;
