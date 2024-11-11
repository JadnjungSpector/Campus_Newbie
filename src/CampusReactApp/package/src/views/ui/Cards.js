import React, { useEffect, useState } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardGroup,
  Button,
  Row,
  Col,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
} from "reactstrap";
import Blog from "../../components/dashboard/Blog";
import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";

const Cards = () => {

  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [audienceDropdownOpen, setAudienceDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([]);

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
            />
          </Col>
        ))}
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <h5 className="mb-3 mt-3">Alignment Text</h5>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button color="light-warning">Go somewhere</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button color="light-danger">Go somewhere</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-end">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button color="light-success">Go somewhere</Button>
            </div>
          </Card>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-2*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <h5 className="mb-3 mt-3">Colored Card</h5>
        <Col md="6" lg="3">
          <Card body color="primary" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="info" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="success" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="danger" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-warning">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-info">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-danger">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-Group*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <h5 className="mb-3 mt-3">Card Group</h5>
        <Col>
          <CardGroup>
            <Card>
              <CardImg alt="Card image cap" src={bg1} top width="100%" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg alt="Card image cap" src={bg2} top width="100%" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg alt="Card image cap" src={bg3} top width="100%" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
