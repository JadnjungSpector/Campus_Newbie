import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
} from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import { useNavigate } from 'react-router-dom';

const Cards = () => {

  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [audienceDropdownOpen, setAudienceDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([])
  const navigate = useNavigate();

  // Fetch activities from the backend
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('http://localhost:5001/activities');
        const data = await response.json();
        setFilteredActivities(data); // change this? Jordyn
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Log activities before rendering
  console.log("Activities in render:", activities);

  // Generate filter options based on activity types and audiences
  const typeOptions = [...new Set(activities.flatMap(activity => activity.activity_type))];
  const audienceOptions = [...new Set(activities.flatMap(activity => activity.audience))];

  const toggleTypeDropdown = () => setTypeDropdownOpen(prevState => !prevState);
  const toggleAudienceDropdown = () => setAudienceDropdownOpen(prevState => !prevState);


  const handleTypeChange = (selectedType) => {
    const updatedTypes = selectedTypes.includes(selectedType)
      ? selectedTypes.filter(type => type !== selectedType)
      : [...selectedTypes, selectedType];
    
    setSelectedTypes(updatedTypes);
    filterActivities(updatedTypes, selectedAudiences);
  };
  const handleAudienceChange = (selectedAudience) => {
    const updatedAudiences = selectedAudiences.includes(selectedAudience)
      ? selectedAudiences.filter(audience => audience !== selectedAudience)
      : [...selectedAudiences, selectedAudience];
    
    setSelectedAudiences(updatedAudiences);
    filterActivities(selectedTypes, updatedAudiences);
  };
  const filterActivities = (types, audiences) => {
    if (types.length === 0 && audiences.length === 0) {
      setFilteredActivities(activities);  // Show all activities if no filters
    } else {
      const filtered = activities.filter(activity => 
        (types.length === 0 || activity.activity_type.some(type => types.includes(type))) &&
        (audiences.length === 0 || activity.audience.some(audience => audiences.includes(audience)))
      );
      setFilteredActivities(filtered);
    }
  };
  
  const handleCheckItOutClick = (id) => {
    navigate(`/activity/${id}`);
  };



  return (
    <div>
       {/* Filter Bar */}
<Row className="mb-3">
  <Col className="d-flex">
    <Dropdown isOpen={typeDropdownOpen} toggle={toggleTypeDropdown} className="me-2">
      <DropdownToggle
        caret
        style={{
          backgroundColor: '#A886DE',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#9578C7'} // Hover effect
        onMouseOut={(e) => e.target.style.backgroundColor = '#A886DE'}  // Reset to original color
      >
        Filter by activity type
      </DropdownToggle>
      <DropdownMenu>
        {typeOptions.map((type, index) => (
          <DropdownItem key={index} onClick={() => handleTypeChange(type)}>
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              readOnly
            /> {type}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>

    <Dropdown isOpen={audienceDropdownOpen} toggle={toggleAudienceDropdown}>
      <DropdownToggle
        caret
        style={{
          backgroundColor: '#A886DE',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#9578C7'} // Hover effect
        onMouseOut={(e) => e.target.style.backgroundColor = '#A886DE'}  // Reset to original color
      >
        Filter by audience
      </DropdownToggle>
      <DropdownMenu>
        {audienceOptions.map((audience, index) => (
          <DropdownItem key={index} onClick={() => handleAudienceChange(audience)}>
            <input
              type="checkbox"
              checked={selectedAudiences.includes(audience)}
              readOnly
            /> {audience}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  </Col>
</Row>


      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <h5 className="mb-3">Results</h5>
      <Row>
        {filteredActivities.map((activity, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={activity.activity_home_image}
              title={activity.activity_title}
              subtitle={activity.activity_summary} 
              text={activity.description}  
              color="darkerPurple" // Double ensure color  
              onClick={() => handleCheckItOutClick(activity._id)}     
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cards;
