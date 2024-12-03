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
  const { user } = useUser();
  const [bookmarkedActivities, setBookmarkedActivities] = useState([]);

  // Fetch bookmarked activities for the user
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bookmarked activities
        const bookmarkedResponse = await fetch(`http://localhost:5001/api/v1/user/${user}/bookmarked-activities`);
        const bookmarkedData = await bookmarkedResponse.json();
        console.log('Fetched bookmarked activities:', bookmarkedData);

        const bookmarkedList = bookmarkedData.bookmarkedActivities || [];
        setBookmarkedActivities(bookmarkedList);

        // Fetch all activities
        const activitiesResponse = await fetch('http://localhost:5001/activities');
        const allActivities = await activitiesResponse.json();

        // Filter activities based on bookmarked activities
        const userActivities = allActivities.filter((activity) =>
          bookmarkedList.includes(activity.activity_title)
        );

        setActivities(userActivities);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]); // Re-fetch when `user` changes

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
