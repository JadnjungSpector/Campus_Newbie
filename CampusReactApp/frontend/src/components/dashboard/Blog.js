import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { FaStar } from 'react-icons/fa';
import { useUser } from "../../views/ui/UserContext";
import useBookmarkedActivities from "../../views/ui/BookMarkedActivity";

const Blog = ({ id, image, title, subtitle, text, color, onClick }) => {
  const { user } = useUser();
  const [bookmarkedActivities, setBookmarkedActivities] = useBookmarkedActivities(user);
  const [isStarred, setIsStarred] = useState(false); // State to track the star's color

  // Update the star state based on bookmarked activities on initial render or when activities change
  useEffect(() => {
    setIsStarred(bookmarkedActivities.includes(title));
  }, [bookmarkedActivities, title]);

  const addBookmarkedActivity = async (username, activity_title) => {
    try {
      const response = await fetch(`http://localhost:5001/api/v1/user/${username}/bookmarked-activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ activity_title }),
      });

      if (!response.ok) {
        throw new Error('Failed to add bookmarked activity');
      }
      const data = await response.json();
      console.log('Updated bookmarked activities:', data.bookmarkedActivities);
      return data.bookmarkedActivities;
    } catch (error) {
      console.error('Error adding bookmarked activity:', error);
      throw error;
    }
  };

  const toggleStar = async () => {
    try {
      const updatedActivities = await addBookmarkedActivity(user, title);
      setBookmarkedActivities([...updatedActivities]); 
      setIsStarred(updatedActivities.includes(title)); 
    } catch (error) {
      console.error("Error toggling star:", error);
    }
  };

  return (
    <Card>
      <CardImg alt="Card image cap" src={image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText className="mt-3">{text}</CardText>
        <Button color={color} onClick={onClick}>Check it out</Button>
        {user && (
          <FaStar
            onClick={toggleStar}
            style={{
              color: isStarred ? 'yellow' : 'gray',
              cursor: 'pointer',
              marginLeft: '80px',
              fontSize: '20px',
              stroke: 'black',
              strokeWidth: '10px',
            }}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default Blog;
