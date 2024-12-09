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

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errors, setErrors] = useState({}); // For tracking validation errors
  const [isExpirationNever, setIsExpirationNever] = useState(false);

  // Handle changes for the "Never" checkbox
  const handleNeverChange = () => {
    setIsExpirationNever(!isExpirationNever);
    if (!isExpirationNever) {
      setFormData({ ...formData, expirationDate: 'Never' }); // Set expirationDate to "Never"
    } else {
      setFormData({ ...formData, expirationDate: '' }); // Clear expirationDate
    }
  };


  // State to hold form data
  const [formData, setFormData] = useState({
    studentName: '',
    activityTitle: '',
    description: '',
    targetAudience: [],
    eventCategories: [],
    imageUrl: '', // Use imageUrl instead of image file
    locationString: '',
    expirationDate: '', 
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Name of student is required.';
    }
    if (!formData.activityTitle.trim()) {
      newErrors.activityTitle = 'Activity title is required.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (formData.targetAudience.length === 0) {
      newErrors.targetAudience = 'Please select at least one target audience.';
    }
    if (formData.eventCategories.length === 0) {
      newErrors.eventCategories = 'Please select at least one event category.';
    }
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required.';
    }
    if (!formData.locationString.trim()) {
      newErrors.locationString = 'Location is required.';
    }
    if (!isExpirationNever && !formData.expirationDate.trim()) {
      newErrors.expirationDate = 'Expiration date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if there are no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      setSubmissionStatus('error'); 
      return;
    }

    const activityData = {
      studentName: formData.studentName,
      activityTitle: formData.activityTitle,
      description: formData.description,
      targetAudience: formData.targetAudience,
      eventCategories: formData.eventCategories,
      image: formData.imageUrl,
      location: formData.locationString,
      expirationDate: isExpirationNever ? null : formData.expirationDate,
    };

    try {
      const response = await axios.post('http://localhost:5001/api/activities', activityData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Activity created:', response.data);

      setSubmissionStatus('success');
      setFormData({
        studentName: '',
        activityTitle: '',
        description: '',
        targetAudience: [],
        eventCategories: [],
        imageUrl: '',
        location: '', 
        expirationDate: '',
      });

      setTimeout(() => setSubmissionStatus(null), 3000);
    } catch (error) {
      console.error('Error creating activity:', error);
      setSubmissionStatus('error');
    }
  };

  return (
    <div>
      <h3 className="mb-4">Submit an Activity</h3>
       {/* Feedback Messages */}
       {submissionStatus === 'success' && (
        <div className="alert alert-success" role="alert">
          Activity submitted successfully!
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className="alert alert-danger" role="alert">
          Please fix the highlighted errors before submitting.
        </div>
      )}
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
                invalid={!!errors.studentName}
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
                invalid={!!errors.activityTitle}
              />
              {errors.activityTitle && <small className="text-danger">{errors.activityTitle}</small>}
            </FormGroup>
            </Col>
          <Col md="6">
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
            invalid={!!errors.description}
          />
          {errors.description && <small className="text-danger">{errors.description}</small>}
        </FormGroup>

        <FormGroup>
          <Label>Target Audience</Label>
          <Select
            isMulti
            options={audienceOptions}
            value={audienceOptions.filter(option => formData.targetAudience.includes(option.value))}
            onChange={handleAudienceChange}
            placeholder="Select target audience..."
          />
          {errors.targetAudience && <small className="text-danger">{errors.targetAudience}</small>}
        </FormGroup>

        <FormGroup>
          <Label>Event Categories</Label>
          <Select
            isMulti
            options={categoryOptions}
            value={categoryOptions.filter(option => formData.eventCategories.includes(option.value))}
            onChange={handleCategoryChange}
            placeholder="Select event categories..."
          />
          {errors.eventCategories && <small className="text-danger">{errors.eventCategories}</small>}
        </FormGroup>

        <FormGroup>
          <Label for="imageUrl">Image URL</Label>
          <Input
            type="url"
            name="imageUrl"
            id="imageUrl"
            placeholder="Enter an image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            invalid={!!errors.imageUrl}
          />
          {errors.imageUrl && <small className="text-danger">{errors.imageUrl}</small>}
        </FormGroup>
        <FormGroup>
          <Label for="locationString">Location</Label>
          <Input
            type="text"
            name="locationString"
            id="locationString"
            placeholder="Enter the location"
            value={formData.locationString}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="expirationDate">Expiration Date</Label>
          <Input
            type="date"
            name="expirationDate"
            id="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            disabled={isExpirationNever} // Disable the date picker if "Never" is selected
          />
          {errors.expirationDate && <small className="text-danger">{errors.expirationDate}</small>}
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={isExpirationNever}
              onChange={handleNeverChange}
            />
            Never
          </Label>
        </FormGroup>
        <Button className="text-white" style={{ backgroundColor: '#A78BFA', borderColor: '#A78BFA' }} type="submit">
          Submit Activity
        </Button>
      </Form>
    </div>
  );
};

export default SubmitActivity;