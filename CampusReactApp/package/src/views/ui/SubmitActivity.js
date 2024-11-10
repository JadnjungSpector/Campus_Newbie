import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const SubmitActivity = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    studentName: '',
    description: '',
    image: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload separately
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission (for now, just logs data)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Reset form data
    setFormData({
      studentName: '',
      description: '',
      image: null,
    });
  };

  return (
    <div>
      <h3 className="mb-4">Submit an Activity</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="studentName">Name of Student</Label>
              <Input
                type="text"
                name="studentName"
                id="studentName"
                placeholder="Enter your name"
                value={formData.studentName}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Enter a description of the activity"
                value={formData.description}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="image">Upload Image</Label>
          <Input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Submit Activity
        </Button>
      </Form>
    </div>
  );
};

export default SubmitActivity;