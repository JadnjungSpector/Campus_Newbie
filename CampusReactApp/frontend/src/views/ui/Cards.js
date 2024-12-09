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
import './Cards.css';
import { FaStar } from 'react-icons/fa';

const Cards = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [audienceDropdownOpen, setAudienceDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(false);

  // States for activity rating and safety rating filters
  const [activityRating, setActivityRating] = useState(null);
  const [safetyRating, setSafetyRating] = useState(null);
  const [activityRatingDropdownOpen, setActivityRatingDropdownOpen] = useState(false);
  const [safetyRatingDropdownOpen, setSafetyRatingDropdownOpen] = useState(false);


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
  

  // Toggles the activity type filter dropdown visibility by inverting the current state
  const toggleTypeDropdown = () => setTypeDropdownOpen((prevState) => !prevState);
  // Toggles the audience filter dropdown visibility by inverting the current state
  const toggleAudienceDropdown = () => setAudienceDropdownOpen((prevState) => !prevState);
  const toggleActivityRatingDropdown = () => setActivityRatingDropdownOpen((prevState) => !prevState);
  const toggleSafetyRatingDropdown = () => setSafetyRatingDropdownOpen((prevState) => !prevState);

  // Handles changes to the selected activity type filter
  const handleTypeChange = (selectedType) => {
    const updatedTypes = selectedTypes.includes(selectedType)
      ? selectedTypes.filter((type) => type !== selectedType)
      : [...selectedTypes, selectedType];

    setSelectedTypes(updatedTypes);
    filterActivities(updatedTypes, selectedAudiences, activityRating, safetyRating);
  };

  // Handles changes to the selected audience filter
  const handleAudienceChange = (selectedAudience) => {
    const updatedAudiences = selectedAudiences.includes(selectedAudience)
      ? selectedAudiences.filter((audience) => audience !== selectedAudience)
      : [...selectedAudiences, selectedAudience];

    setSelectedAudiences(updatedAudiences);
    filterActivities(selectedTypes, updatedAudiences, activityRating, safetyRating);
  };

  // Handles changes to the minimum activity rating filter
  const handleActivityRatingClick = (index) => {
    const newRating = activityRating === index ? null : index; // Toggle or set new rating
    setActivityRating(newRating); // Update state with new rating
    filterActivities(selectedTypes, selectedAudiences, newRating, safetyRating); // Apply filter
  };
   
  // Handles changes to the minimum safety rating filter
  const handleSafetyRatingClick = (index) => {
    const newRating = safetyRating === index ? null : index; // Toggle or set new rating
    setSafetyRating(newRating); // Update state with new rating
    filterActivities(selectedTypes, selectedAudiences, activityRating, newRating); // Apply filter
  };

  // Function to apply all filters: types, audiences, activity rating, and safety rating
  const filterActivities = (types, audiences, activityRating, safetyRating) => {
    const filtered = activities.filter((activity) =>
      // Filter by activity type
      (types.length === 0 || activity.activity_type.some((type) => types.includes(type))) &&
      // Filter by audience
      (audiences.length === 0 || activity.audience.some((audience) => audiences.includes(audience))) &&
      // Filter by activity rating: show activities with rating >= selected rating
      (activityRating === null || activity.activity_rating >= activityRating) &&
      // Filter by safety rating: show activities with safety rating >= selected rating
      (safetyRating === null || activity.safety_rating >= safetyRating)
    );

    // If no filters are applied, show all activities
    setFilteredActivities(filtered.length === activities.length ? activities : filtered);
  };

  const handleCheckItOutClick = async (activityId) => {
    setLoadingActivity(true);
    try {
      const response = await fetch(`http://localhost:5001/activities/${activityId}`);
      const data = await response.json();
      setSelectedActivity(data); // Load the detailed activity
    } catch (error) {
      console.error('Error fetching single activity:', error);
    } finally {
      setLoadingActivity(false);
    }
  };

  const handleBackClick = () => {
    setSelectedActivity(null); // Reset to list view
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
                  <strong>Safety Rating: </strong>
                  {Array.from({ length: selectedActivity.safety_rating }).map((_, index) => (
                    <FaStar key={index} color="gold" />
                  ))}
                </CardText>
                <CardText className="text-center">{selectedActivity.activity_summary}</CardText>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
                  <Button color="success">Get Directions</Button>
                  <Button color="primary">Add a Review</Button>
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
                      <strong>{review.user}</strong>
                      <p>{review.text}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available</p>
                )}
              </CardBody>
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
              <Dropdown isOpen={audienceDropdownOpen} toggle={toggleAudienceDropdown} className="me-2">
                <DropdownToggle caret>Filter by audience</DropdownToggle>
                <DropdownMenu>
                  {audienceOptions.map((audience, index) => (
                    <DropdownItem key={index} onClick={() => handleAudienceChange(audience)}>
                      <input type="checkbox" checked={selectedAudiences.includes(audience)} readOnly /> {audience}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              {/* Activity Rating Filter */}
              <Dropdown isOpen={activityRatingDropdownOpen} toggle={toggleActivityRatingDropdown} className="me-2">
                <DropdownToggle caret>Filter by Activity Rating</DropdownToggle>
                <DropdownMenu>
                  {[...Array(6)].map((_, index) => (
                    <DropdownItem key={index} onClick={() => handleActivityRatingClick(index)}>
                    {index} {Array.from({ length: index }, (_, i) => (
                      <FaStar key={i} color={activityRating === index ? 'gold' : 'gray'} />
                    ))}
                  </DropdownItem>            
                  ))}
                </DropdownMenu>
              </Dropdown>

              {/* Safety Rating Filter */}
              <Dropdown isOpen={safetyRatingDropdownOpen} toggle={toggleSafetyRatingDropdown} className="me-2">
                <DropdownToggle caret>Filter by Safety Rating</DropdownToggle>
                <DropdownMenu>
                  {[...Array(6)].map((_, index) => (
                    <DropdownItem key={index} onClick={() => handleSafetyRatingClick(index)}>
                    {index} {Array.from({ length: index }, (_, i) => (
                      <FaStar key={i} color={safetyRating >= index ? 'gold' : 'gray'} />
                    ))}
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
