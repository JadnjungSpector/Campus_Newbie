import { Col, Row } from "reactstrap";
import React, { useEffect, useState } from 'react';
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";

import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";

import background from "../assets/images/bg/UWCity.jpg";
import userpic from "../assets/images/users/IMG_1874.jpeg";

const Starter = () => {
  const [activities, setActivities] = useState([]);

  // Fetch activities from the backend
  useEffect(() => {
      const fetchActivities = async () => {
        try {
          const response = await fetch('http://localhost:5001/activities');
          const data = await response.json();
          setActivities(data);
        } catch (error) {
          console.error('Error fetching activities:', error);
        }
      };

      fetchActivities();
    }, []);

    // Log activities before rendering
    console.log("Activities in render:", activities);
  return (
    <div
    style={{
      fontFamily: "'Amatic SC', cursive", // Set font family here for all text
      color: "black", // Set a base color for all text if needed
    }}>
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
          <div style= {{ 
            transform: "translate(-200px, -200px)", 
            color: "black", 
            fontSize: "60px", 
            }}>
            <p>Your Name</p>

          </div>
        </Col>
      </Row>
      



      <h5 className="mb-3">BookMarked Activities</h5>
      <Row style={{ marginTop: "-130px" }}>
        {activities.map((activity, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={activity.activity_home_image}
              title={activity.activity_title}
              subtitle={activity.activity_summary} 
              text={activity.description}  
              color="darkerPurple" // Double ensure color         
            />
          </Col>
        ))}
      </Row>

      <Row >
        <Col lg="12">
        <div style={{ fontSize: "1.2em" }}>
          <ProjectTables />
        </div>
        </Col>
      </Row>

    </div>
  );
};

export default Starter;
