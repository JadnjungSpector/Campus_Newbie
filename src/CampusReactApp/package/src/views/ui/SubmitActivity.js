import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const SubmitActivity = () => {
  const audienceOptions = [
    { value: "Family Friendly", label: "Family Friendly" },
    { value: "21+", label: "21+" },
    { value: "Undergraduate Students", label: "Undergraduate Students" },
    { value: "Graduate Students", label: "Graduate Students" },
    { value: "Professors", label: "Professors" },
    { value: "Parent's weekend", label: "Parent's weekend" },
    { value: "Students only", label: "Students only" }
  ];

  const categoryOptions = [
    { value: "Outside", label: "Outside" },
    { value: "Study spots", label: "Study spots" },
    { value: "Inside", label: "Inside" },
    { value: "Religious", label: "Religious" },
    { value: "Clubs", label: "Clubs" },
    { value: "Sports", label: "Sports" }
  ];

  // State to hold form data
  const [formData, setFormData] = useState({
    studentName: '',
    activityTitle: '',
    description: '',
    targetAudience: [],
    eventCategories: [],
    imageUrl: '', // Use imageUrl instead of image file
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle multi-select changes for Target Audience
  const handleAudienceChange = (selectedOptions) => {
    setFormData({
      ...formData,
      targetAudience: selectedOptions ? selectedOptions.map(option => option.value) : []
    });
  };

  // Handle multi-select changes for Event Categories
  const handleCategoryChange = (selectedOptions) => {
    setFormData({
      ...formData,
      eventCategories: selectedOptions ? selectedOptions.map(option => option.value) : []
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const activityData = {
      studentName: formData.studentName,
      activityTitle: formData.activityTitle,
      description: formData.description,
      targetAudience: formData.targetAudience,
      eventCategories: formData.eventCategories,
      image: formData.imageUrl, // Send image URL to the backend
    };

    try {
      const response = await axios.post('http://localhost:5001/api/activities', activityData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Activity created:', response.data);

      // Reset form data after successful submission
      setFormData({
        studentName: '',
        activityTitle: '',
        description: '',
        targetAudience: [],
        eventCategories: [],
        imageUrl: '', // Reset image URL field
      });
    } catch (error) {
      console.error('Error creating activity:', error);
    }
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
              <Label for="activityTitle">Activity Title</Label>
              <Input
                type="text"
                name="activityTitle"
                id="activityTitle"
                placeholder="Enter the title of the activity"
                value={formData.activityTitle}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
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
        
        {/* Target Audience Multi-Select Dropdown */}
        <FormGroup>
          <Label>Target Audience</Label>
          <Select
            isMulti
            options={audienceOptions}
            value={audienceOptions.filter(option => formData.targetAudience.includes(option.value))}
            onChange={handleAudienceChange}
            placeholder="Select target audience..."
          />
        </FormGroup>

        {/* Event Categories Multi-Select Dropdown */}
        <FormGroup>
          <Label>Event Categories</Label>
          <Select
            isMulti
            options={categoryOptions}
            value={categoryOptions.filter(option => formData.eventCategories.includes(option.value))}
            onChange={handleCategoryChange}
            placeholder="Select event categories..."
          />
        </FormGroup>

        {/* Image URL Input */}
        <FormGroup>
          <Label for="imageUrl">Image URL</Label>
          <Input
            type="url"
            name="imageUrl"
            id="imageUrl"
            placeholder="Enter an image URL"
            value={formData.imageUrl}
            onChange={handleChange}
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