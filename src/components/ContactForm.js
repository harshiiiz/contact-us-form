import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
const ContactForm = () => {
  const [result, setResult] = useState(null);// to store the response from the API.
  const [form, setForm] = useState(() => {
    return {
    name: "",
    email: "",
    subject: "",
    message: "",
    }
  });
  const{name,email,subject, message}=form;

  const sendEmail = (event) => {
    event.preventDefault();
    axios
    .post('/send', { ...form })
    .then(response => {
      setResult(response.data);
      setForm({ name: '', email: '', subject: '', message: '' });
    })
    .catch(() => {
      setResult({ success: false, message: 'Something went wrong. Try again later'});
    });
   //console.log("We will fill this up shortly.");
    // code to trigger Sending email
  };
  const onInputChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div>
      {result && (
        <p className={`${result.success ? 'success' : 'error'}`}>
          {result.message}
        </p>
      )}
      <form onSubmit={sendEmail}>
        <Form.Group controlId="name">
          <Form.Label>Full Name</Form.Label>

          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="Enter your full name"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={subject}
            placeholder="Enter subject"
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            value={message}
            rows="3"
            placeholder="Enter your message"
            onChange={onInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
