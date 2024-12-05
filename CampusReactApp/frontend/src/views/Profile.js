import React, { useEffect, useState } from "react";
import { Col, Row, Button, Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import { FaStar } from "react-icons/fa";
import Blog from "../components/dashboard/Blog";
import background from "../assets/images/bg/UWCity.jpg";
import userpic from "../assets/images/users/IMG_1874.jpeg";
import Friends from "../components/dashboard/Friend";
import AddReviewForm from "../views/ui/AddReviewForm"; // Import the AddReviewForm component
import { useUser } from "../views/ui/UserContext"; // Assuming this provides user info
import useBookmarkedActivities from "../views/ui/BookMarkedActivity";

const Profile = () => {
  const { user } = useUser(); // Extract `user` from context
  const [activities, setActivities] = useState([]);
  const [bookmarkedActivities, setBookmarkedActivities] = useBookmarkedActivities(user);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [isFlagged, setFlagged] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activitiesResponse = await fetch('http://localhost:5001/activities');
        const allActivities = await activitiesResponse.json();
  
        const userActivities = allActivities.filter((activity) =>
          bookmarkedActivities.includes(activity.activity_title)
        );
  
        setActivities(userActivities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [bookmarkedActivities]); 
  
  const [showReviewForm, setShowReviewForm] = useState(false); // Toggle state for the review form

  const handleCheckItOutClick = async (activityId) => {
    setLoadingActivity(true);
    try {
      const response = await fetch(`http://localhost:5001/activities/${activityId}`);
      const data = await response.json();
      setSelectedActivity(data);
      setFlagged(selectedActivity.flagged);
    } catch (error) {
      console.error("Error fetching single activity:", error);
    } finally {
      setLoadingActivity(false);
    }
  };

  const handleBackClick = () => {
    setSelectedActivity(null);
    setShowReviewForm(false); // Ensure the review form is hidden when going back
  };

  const handleReviewAdded = (updatedActivity) => {
    setSelectedActivity(updatedActivity); // Update the selected activity with the new review
    setShowReviewForm(false); // Hide the review form after submission
  };

  const handleFlagging = async () => {
    setFlagged(!isFlagged);
    try {
      // Make the update request to the server
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

      // Update the local state
      setSelectedActivity(updatedActivity);
      console.log('Flagged status successfully updated');
    } catch (error) {
      console.error('Error updating flagged status:', error);
    }
  };

  return (
    <div>
      {selectedActivity ? (
        <div>
          <Button color="secondary" onClick={handleBackClick} className="mb-3">
            Back to Activities
          </Button>
          {loadingActivity ? (
            <p>Loading...</p>
          ) : (
            <Card
              style={{
                width: "100%",
                maxWidth: "800px",
                padding: "20px",
                borderRadius: "10px",
                margin: "0 auto",
              }}
            >
              <CardImg
                top
                src={selectedActivity.activity_home_image}
                alt={selectedActivity.activity_title}
              />
              <CardBody>
                <CardTitle tag="h3" className="text-center">
                  {selectedActivity.activity_title}
                </CardTitle>
                <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
                  {selectedActivity.activity_type.map((type, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: "#f1f1f1",
                        padding: "5px 10px",
                        borderRadius: "15px",
                        margin: "0 5px",
                        fontSize: "0.9em",
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <CardText className="text-center">
                  <strong>Safety Rating: </strong>
                  {Array.from({ length: selectedActivity.safety_rating || 0 }).map((_, index) => (
                    <FaStar key={index} color="gold" />
                  ))}
                </CardText>
                <CardText className="text-center">{selectedActivity.activity_summary}</CardText>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
                  <Button color="success">Get Directions</Button>
                  <Button color="primary">Add a Review</Button>
                  <Button color="warning" onClick={handleFlagging}>{isFlagged ? ("Reported") : ("Report")}</Button>
                  <Button color="primary" onClick={() => setShowReviewForm(!showReviewForm)}>
                    {showReviewForm ? "Close Review Form" : "Add a Review"}
                  </Button>
                </div>
                <h5 className="mt-4">Reviews:</h5>
                {selectedActivity.reviews && selectedActivity.reviews.length > 0 ? (
                  selectedActivity.reviews.map((review, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#f9f9f9",
                        padding: "10px",
                        borderRadius: "8px",
                        margin: "10px 0",
                      }}
                    >
                      <strong>{review.user}</strong>
                      <p>{review.text}</p>
                    </div>
                  ))
                ) : (
                  <p>No reviews available</p>
                )}
              </CardBody>
              {/* Conditionally render the AddReviewForm */}
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
        <div>
          <Row className="mb-4">
            <Col lg="12" className="text-center">
              <img
                src={background}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "10px",
                }}
              />
              <img
                src={userpic}
                alt="Profile"
                style={{
                  transform: "translate(-450px, -75px)",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  border: "8px solid white",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "calc(50% - 450px + 250px)",
                  top: "calc(50% - 40px)",
                  color: "black",
                  fontSize: "60px",
                  fontWeight: "bold",
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                  letterSpacing: "1.5px",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                <p>{user}</p>
              </div>
            </Col>
          </Row>
          <div style={{ marginTop: "-30px" }}>
            <h5 className="text-center mb-4" style={{ fontWeight: "bold" }}>
              Bookmarked Activities
            </h5>
            <Row>
              {activities.map((activity, index) => (
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
          <Row>
            <Col lg="12">
              <Friends />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Profile;
