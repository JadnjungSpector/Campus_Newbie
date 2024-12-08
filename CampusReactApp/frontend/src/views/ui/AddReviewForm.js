import React, { useState } from 'react';
import './AddReviewForm.css'; // Import the CSS file
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const AddReviewForm = ({ id, onReviewAdded }) => {
    console.log('Reviewing activity with ID:', id); // Debugging

  const [review, setReview] = useState({
    
    user: '',
    text: '',
    safety_rating: 0,
    general_rating: 0,
    image: null
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the review fields
    if (review.text.split(' ').length < 20) {
      setError('Review must be at least 20 words long.');
      return;
    }
    if (!review.image) {
      setError('Image is required.');
      return;
    }
    if (!review.safety_rating || !review.general_rating) {
      setError('Both safety and general ratings are required.');
      return;
    }
    setError(''); // Clear the error

    // Prepare the form data
    const formData = new FormData();
    formData.append('user', review.user);
    formData.append('text', review.text);
    formData.append('safety_rating', review.safety_rating);
    formData.append('general_rating', review.general_rating);
    formData.append('image', review.image);

    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      
    try {
      // Submit the form data to the backend
      const response = await fetch(`http://localhost:5001/activities/${id}/reviews`, {
        method: 'POST',
        body: formData,
     });

      if (response.ok) {
        const updatedActivity = await response.json();
        onReviewAdded(updatedActivity); // Update the parent component with the new review
      } else {
        console.error('Failed to add review:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };



  return (
    <Form onSubmit={handleSubmit} className="add-review-form">
      <FormGroup>
        <Label for="user">Name</Label>
        <Input
          type="text"
          id="user"
          value={review.user}
          onChange={(e) => setReview({ ...review, user: e.target.value })}
          placeholder="Enter your name"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="text">Review</Label>
        <Input
          type="textarea"
          id="text"
          value={review.text}
          onChange={(e) => setReview({ ...review, text: e.target.value })}
          placeholder="Write your review (at least 20 words)"
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="safety_rating">Safety Rating</Label>
        <Input
          type="number"
          id="safety_rating"
          min="1"
          max="5"
          value={review.safety_rating}
          onChange={(e) => setReview({ ...review, safety_rating: parseInt(e.target.value, 10) })}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="general_rating">General Rating</Label>
        <Input
          type="number"
          id="general_rating"
          min="1"
          max="5"
          value={review.general_rating}
          onChange={(e) => setReview({ ...review, general_rating: parseInt(e.target.value, 10) })}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="image">Image</Label>
        <Input
          type="file"
          id="image"
          onChange={(e) => setReview({ ...review, image: e.target.files[0] })}
          required
        />
      </FormGroup>
      {error && <p className="error-message">{error}</p>}
      <Button type="submit" color="primary">
        Submit Review
      </Button>
    </Form>
  );
};

export default AddReviewForm;
