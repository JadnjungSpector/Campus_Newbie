import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import { FaStar } from 'react-icons/fa';
import AddReviewForm from './AddReviewForm'; 

const Cards = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [audienceDropdownOpen, setAudienceDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [isFlagged, setFlagged] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false); 

  // Fetch all activities for the list view
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:5001/activities');
        const data = await response.json();
        setFilteredActivities(data);
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Generate filter options based on activity types and audiences
  const typeOptions = [...new Set(activities.flatMap(activity => activity.activity_type || []))];
  const audienceOptions = [...new Set(activities.flatMap(activity => activity.audience || []))];

  const toggleTypeDropdown = () => setTypeDropdownOpen((prevState) => !prevState);
  const toggleAudienceDropdown = () => setAudienceDropdownOpen((prevState) => !prevState);

  const handleTypeChange = (selectedType) => {
    const updatedTypes = selectedTypes.includes(selectedType)
      ? selectedTypes.filter((type) => type !== selectedType)
      : [...selectedTypes, selectedType];

    setSelectedTypes(updatedTypes);
    filterActivities(updatedTypes, selectedAudiences);
  };

  const handleAudienceChange = (selectedAudience) => {
    const updatedAudiences = selectedAudiences.includes(selectedAudience)
      ? selectedAudiences.filter((audience) => audience !== selectedAudience)
      : [...selectedAudiences, selectedAudience];

    setSelectedAudiences(updatedAudiences);
    filterActivities(selectedTypes, updatedAudiences);
  };

  const filterActivities = (types, audiences) => {
    if (types.length === 0 && audiences.length === 0) {
      setFilteredActivities(activities);
    } else {
      const filtered = activities.filter(
        (activity) =>
          (types.length === 0 || activity.activity_type.some((type) => types.includes(type))) &&
          (audiences.length === 0 || activity.audience.some((audience) => audiences.includes(audience)))
      );
      setFilteredActivities(filtered);
    }
  };

  const handleCheckItOutClick = async (activityId) => {
    setLoadingActivity(true);
    try {
      const response = await fetch(`http://localhost:5001/activities/${activityId}`);
      const data = await response.json();
      setSelectedActivity(data); // Load the detailed activity
      setFlagged(selectedActivity.flagged);
    } catch (error) {
      console.error('Error fetching single activity:', error);
    } finally {
      setLoadingActivity(false);
    }
  };

  const handleBackClick = () => {
    setSelectedActivity(null); // Reset to list view
  };

  const handleFlagging = async () => {
    setFlagged(!isFlagged);
    try {
      const response = await fetch(`http://localhost:5001/activities/${selectedActivity.id}/flagged`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFlagged }),
      });

      if (!response.ok) {
        throw new Error('Failed to update activity');
      }

      const updatedActivity = await response.json();

      setSelectedActivity(updatedActivity);
      console.log('Flagged status successfully updated');
    } catch (error) {
      console.error('Error updating flagged status:', error);
    }
  };

  const handleReviewAdded = (updatedActivity) => {
    setSelectedActivity(updatedActivity); // Update the activity with the new reviews
    setShowReviewForm(false); // Hide the review form after submission
  };

  const handleDirections = () => {
    if (selectedActivity) {
      const destination = selectedActivity.activity_title;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div>
      {selectedActivity ? (
        // Single Activity View
        <div>
          <Button color="secondary" onClick={handleBackClick} className="mb-3">
            Back to Activities
          </Button>
          {loadingActivity ? (
            <p>Loading...</p>
          ) : (
            <Card style={{ width: '100%', maxWidth: '800px', padding: '20px', borderRadius: '10px', margin: '0 auto' }}>
              <CardImg top src={selectedActivity.activity_home_image} alt={selectedActivity.activity_title} />
              <CardBody>
                <CardTitle tag="h3" className="text-center">{selectedActivity.activity_title}</CardTitle>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                  {selectedActivity.activity_type.map((type, index) => (
                    <span key={index} style={{
                      backgroundColor: '#f1f1f1',
                      padding: '5px 10px',
                      borderRadius: '15px',
                      margin: '0 5px',
                      fontSize: '0.9em'
                    }}>
                      {type}
                    </span>
                  ))}
                </div>
                <CardText className="text-center">
                  <strong>Overall Rating: </strong>
                  {Array.from({ length: selectedActivity.general_rating }).map((_, index) => (
                    <FaStar key={index} color="gold" />
                  ))}
                </CardText>
                <CardText className="text-center">
                  <strong>Safety Rating: </strong>
                  {Array.from({ length: selectedActivity.safety_rating }).map((_, index) => (
                    <FaStar key={index} color="gold" />
                  ))}
                </CardText>
                <CardText className="text-center">{selectedActivity.activity_summary}</CardText>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
                  <Button color="success" onClick={handleDirections}>Get Directions</Button>
                  <Button color="warning" onClick={handleFlagging}>{isFlagged ? ("Reported") : ("Report")}</Button>
                  <Button
                    style={{
                      backgroundColor: '#A78BFA',
                      color: 'white',
                      border: 'none',
                    }}
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? 'Close Review Form' : 'Add a Review'}
                  </Button>
                </div>
                <h5 className="mt-4">Reviews:</h5>
                 {selectedActivity.reviews && selectedActivity.reviews.length > 0 ? (
                  selectedActivity.reviews.map((review, index) => (
                    <div key={index} style={{
                      backgroundColor: '#f9f9f9',
                      padding: '10px',
                      borderRadius: '8px',
                      margin: '10px 0'
                    }}>
                      <strong style={{ display: 'block', marginBottom: '5px' }}>
                        {review.user}
                      </strong>
                      <p>
                        <strong>General Rating:</strong>{' '}
                        {Array.from({ length: review.general_rating }, (_, i) => (
                          <span key={i} style={{ color: 'gold', fontSize: '16px' }}>★</span>
                        ))}
                      </p>
                      <p>
                        <strong>Safety Rating:</strong>{' '}
                        {Array.from({ length: review.safety_rating }, (_, i) => (
                          <span key={i} style={{ color: 'gold', fontSize: '16px' }}>★</span>
                        ))}
                      </p>
                      <p><strong>Review:</strong> {review.text}</p>
                      {review.image && (
                        <div style={{ marginTop: '10px' }}>
                          <strong>Image:</strong>
                          <img
                            src={typeof review.image === 'string' ? review.image : URL.createObjectURL(review.image)}
                            alt="Review"
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                              marginTop: '5px',
                              borderRadius: '8px',
                              border: '1px solid #ccc',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No reviews available</p>
                )}
              </CardBody>
              {/* Conditionally render AddReviewForm */}
              {showReviewForm && (
                <AddReviewForm
                  activityId={selectedActivity._id}
                  onReviewAdded={handleReviewAdded}
                />
              )}
            </Card>
          )}
        </div>
      ) : (
        // List View
        <div>
          <Row className="mb-3">
            <Col className="d-flex">
              <Dropdown isOpen={typeDropdownOpen} toggle={toggleTypeDropdown} className="me-2">
                <DropdownToggle caret>Filter by activity type</DropdownToggle>
                <DropdownMenu>
                  {typeOptions.map((type, index) => (
                    <DropdownItem key={index} onClick={() => handleTypeChange(type)}>
                      <input type="checkbox" checked={selectedTypes.includes(type)} readOnly /> {type}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Dropdown isOpen={audienceDropdownOpen} toggle={toggleAudienceDropdown}>
                <DropdownToggle caret>Filter by audience</DropdownToggle>
                <DropdownMenu>
                  {audienceOptions.map((audience, index) => (
                    <DropdownItem key={index} onClick={() => handleAudienceChange(audience)}>
                      <input type="checkbox" checked={selectedAudiences.includes(audience)} readOnly /> {audience}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>

          <Row>
            {filteredActivities.map((activity, index) => (
              <Col sm="6" lg="6" xl="3" key={index}>
                <Blog
                  image={activity.activity_home_image}
                  title={activity.activity_title}
                  subtitle={activity.activity_summary}
                  text={activity.description}
                  color="darkerPurple"
                  onClick={() => handleCheckItOutClick(activity._id)}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default Cards;
