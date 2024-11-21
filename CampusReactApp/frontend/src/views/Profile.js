import { Col, Row, Button, Card, CardImg, CardBody, CardTitle, CardText  } from "reactstrap";
import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";



import Blog from "../components/dashboard/Blog";

// import { useNavigate } from 'react-router-dom';

import background from "../assets/images/bg/UWCity.jpg";
import userpic from "../assets/images/users/IMG_1874.jpeg";
import Friends from "../components/dashboard/Friend";
import { useUser } from "../views/ui/UserContext";

const Profile = () => {
  const [activities, setActivities] = useState([]);

  const [selectedActivity, setSelectedActivity] = useState(null); // State to manage the selected activity
  const [loadingActivity, setLoadingActivity] = useState(false);
  const navigate = useNavigate(); 

  const handleCheckItOutClick = async (activityId) => {
    setLoadingActivity(true);
    try {
      const response = await fetch(`http://localhost:5001/activities/${activityId}`);
      const data = await response.json();
      setSelectedActivity(data); // Set the selected activity for the single view
    } catch (error) {
      console.error("Error fetching single activity:", error);
    } finally {
      setLoadingActivity(false);
    }
  };


  const handleBackClick = () => {
    setSelectedActivity(null); // Reset to the list view
  };


  // Fetch activities from the backend
  useEffect(() => {
      const fetchActivities = async () => {
        try {
          const response = await fetch('http://localhost:5001/activities');
          const data = await response.json();
          const userActivities = data.filter(activities => 
            activities.student_name === "Jordyn Manning" || activities.activity_type.includes("Food") 
            || activities.audience.includes("Professors")
          );
          setActivities(userActivities);
        } catch (error) {
          console.error('Error fetching activities:', error);
        }
      };

      fetchActivities();
    }, []);

    // Log activities before rendering
    console.log("Activities in render:", activities);
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
          <Card
            style={{
              width: "100%",
              maxWidth: "800px",
              padding: "20px",
              borderRadius: "10px",
              margin: "0 auto",
            }}
          >
            <CardImg top src={selectedActivity.activity_home_image} alt={selectedActivity.activity_title} />
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
          </Card>
        )}
      </div>
    ) : (
    <div>
      {/*** Background Photo w Profile Photo ***/}
      <Row className="mb-4"> {}
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
          {/* Profile picture on top of the background */}
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
          {/* PUsername set */}
          <div 
            style={{
              position: "absolute", // Ensure positioning relative to the container
              left: "calc(50% - 450px + 250px)", 
              top: "calc(50% - 40px)", // Align vertically with the profile picture
              color: "black",
              fontSize: "60px",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
              letterSpacing: "1.5px",
              fontFamily: "'Roboto', sans-serif",
            }}>
            <p>{user}</p>
          </div>
        </Col>
      </Row>
      

      {/* Bookmarked Activities Section */}
      <div style={{ marginTop: "-30px"}}>
      <h5 className="text-center mb-4" style={{ fontWeight: "bold" }}>Bookmarked Activities</h5>
        <Row>
          {activities.map((activity, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
              <Blog
                image={activity.activity_home_image}
                title={activity.activity_title}
                subtitle={activity.activity_summary}
                text={activity.description}
                color="darkerPurple"
                //to check out the single acitivity-do not remove
                onClick={() => handleCheckItOutClick(activity._id)} // Pass the activity ID
              />
            </Col>
          ))}
        </Row>
      </div>

      <Row >
        <Col lg="12">
        <div>
          {/* <h5 className="text-center mb-4"></h5> Center the title */}
          <Friends/>
          </div>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
        
export default Profile;