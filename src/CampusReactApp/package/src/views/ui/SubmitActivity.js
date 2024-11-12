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
    image: null,
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload separately
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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

  // // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   // Prepare data to send to the backend
  //   const activityData = {
  //     studentName: formData.studentName,
  //     activityTitle: formData.activityTitle,
  //     description: formData.description,
  //     targetAudience: formData.targetAudience,
  //     eventCategories: formData.eventCategories,
  //     image: formData.image ? URL.createObjectURL(formData.image) : null, // Convert image to URL if necessary
  //   };

  //   try {
  //     const response = await axios.post('http://localhost:5001/api/activities', activityData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     console.log('Activity created:', response.data);

  //     // Reset form data
  //     setFormData({
  //       studentName: '',
  //       activityTitle: '',
  //       description: '',
  //       targetAudience: [],
  //       eventCategories: [],
  //       image: null,
  //     });
  //   } catch (error) {
  //     console.error('Error creating activity:', error);
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const data = new FormData();
    data.append('studentName', formData.studentName);
    data.append('activityTitle', formData.activityTitle);
    data.append('description', formData.description);
    data.append('targetAudience', JSON.stringify(formData.targetAudience));
    data.append('eventCategories', JSON.stringify(formData.eventCategories));

    // If there's an image, include it in the request
    if (formData.image) {
        data.append('image', formData.image);
    }

    try {
        const response = await fetch('http://localhost:5001/api/activities', {
            method: 'POST',
            body: JSON.stringify({
                studentName: formData.studentName,
                activityTitle: formData.activityTitle,
                description: formData.description,
                targetAudience: formData.targetAudience,
                eventCategories: formData.eventCategories,
                image: formData.image // Assuming this is a URL or base64 string for now
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Activity created successfully:', result);
            // Reset form data
            setFormData({
                studentName: '',
                activityTitle: '',
                description: '',
                targetAudience: [],
                eventCategories: [],
                image: null,
            });
        } else {
            console.error('Failed to create activity:', result.message);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
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