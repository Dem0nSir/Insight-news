import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Form, Button, Container, Alert } from "react-bootstrap";

function ContactForm() {
  const [state, handleSubmit] = useForm("xanwjklo");

  if (state.succeeded) {
    return (
      <Container className="mt-5">
        <Alert variant="success">Thanks for joining!</Alert>
      </Container>
    );
  }

  return (
    <Container className="">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-100"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Form.Text key={type} className="text-danger">
                  {message}
                </Form.Text>
              ))
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            className="w-100"
            rows={4}
            placeholder="Enter your message"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <Form.Text key={type} className="text-danger">
                  {message}
                </Form.Text>
              ))
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={state.submitting}>
          Submit
        </Button>
        {/* <p className='fs-7 mt-2 ' style={{color:'#5A5A5A'}}>We will get back to you within a day.</p> */}
      </Form>
    </Container>
  );
}

export default ContactForm;
