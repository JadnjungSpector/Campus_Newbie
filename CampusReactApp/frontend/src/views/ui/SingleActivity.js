import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { FaStar } from 'react-icons/fa';

const SingleActivity = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(`http://localhost:5001/activities/${id}`);
        const data = await response.json();
        setActivity(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activity:', error);
        setLoading(false);
      }
    };
    fetchActivity();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!activity) {
    return <p>Activity not found</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card style={{ width: '100%', maxWidth: '800px', padding: '20px', borderRadius: '10px' }}>
        <CardImg top src={activity.activity_home_image} alt={activity.activity_title} />
        <CardBody>
          <CardTitle tag="h3" className="text-center">{activity.activity_title}</CardTitle>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            {activity.activity_type.map((type, index) => (
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
            {Array.from({ length: activity.safety_rating }).map((_, index) => (
              <FaStar key={index} color="gold" />
            ))}
          </CardText>
          <CardText className="text-center">{activity.activity_summary}</CardText>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
            <Button color="success">Get Directions</Button>
            <Button color="primary">Add a Review</Button>
          </div>
          <h5 className="mt-4">Reviews:</h5>
          {activity.reviews && activity.reviews.length > 0 ? (
            activity.reviews.map((review, index) => (
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
    </div>
  );
};

export default SingleActivity;

