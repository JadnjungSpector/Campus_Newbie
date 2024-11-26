import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { FaStar } from 'react-icons/fa';
import { useUser } from "../../views/ui/UserContext";

const Blog = ({ id, image, title, subtitle, text, color, onClick }) => {
    // State to manage star color
    const { user } = useUser();
    const [isStarred, setIsStarred] = useState(false);

    // Toggle the star state
    const toggleStar = () => {
      setIsStarred(!isStarred);
    };
  return (
    <Card>
      <CardImg alt="Card image cap" src={image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText className="mt-3">{text}</CardText>
        <Button color={color} onClick={onClick}>Check it out</Button> {/* Use onClick as is */}
        {/* <button
            onClick={toggleStar}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.5rem',
              color: isStarred ? 'purple' : 'yellow', // Toggle color
            }}
            aria-label={`Star ${title}`}
          >
            <FaStar />
          </button> */}
        {user && (
          <FaStar
            onClick={toggleStar}
            style={{ color: isStarred ? 'yellow' : 'gray', cursor: 'pointer', marginLeft: '10px' }}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default Blog;



 
