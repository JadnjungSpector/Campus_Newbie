import { Col, Row } from "reactstrap";
import React, { useEffect, useState } from 'react';


import Blog from "../components/dashboard/Blog";

// import { useNavigate } from 'react-router-dom';

import background from "../assets/images/bg/UWCity.jpg";
import userpic from "../assets/images/users/IMG_1874.jpeg";
import Friends from "../components/dashboard/Friend";
import { useUser } from "../views/ui/UserContext";

const Profile = () => {
  const [activities, setActivities] = useState([]);
  // const navigate = useNavigate(); 
  const { user } = useUser();
  // Define the function to handle "Check it out" click
  // const handleCheckItOutClick = (id) => {
  //   navigate(`/activity/${id}`);
  // };

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
  );
};

export default Profile;