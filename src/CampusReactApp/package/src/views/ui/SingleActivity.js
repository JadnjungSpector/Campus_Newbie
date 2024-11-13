import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, Spinner } from "reactstrap";

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
    return <Spinner color="primary" />;
  }

  if (!activity) {
    return <p>Activity not found</p>;
  }

  return (
    <Card>
      <CardImg top src={activity.activity_home_image} alt={activity.activity_title} />
      <CardBody>
        <CardTitle tag="h5">{activity.activity_title}</CardTitle>
        <CardText>{activity.activity_summary}</CardText>
        <CardText>{activity.description}</CardText>
        <CardText><strong>Audience:</strong> {activity.audience.join(', ')}</CardText>
        <CardText><strong>Type:</strong> {activity.activity_type.join(', ')}</CardText>
        <CardText><strong>Safety Rating:</strong> {activity.safety_rating}</CardText>
        <CardText><strong>Activity Rating:</strong> {activity.activity_rating}</CardText>
        <CardText><strong>Expiration Date:</strong> {new Date(activity.expiration_date).toLocaleDateString()}</CardText>
      </CardBody>
    </Card>
  );
};

export default SingleActivity;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Card, CardImg, CardBody, CardTitle, CardText, Spinner } from "reactstrap";

// const SingleActivity = () => {
//   const { id } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchActivity = async () => {
//       try {
//         const response = await fetch(`http://localhost:5001/activities/${id}`);
//         const data = await response.json();
//         setActivity(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching activity:', error);
//         setLoading(false);
//       }
//     };
//     fetchActivity();
//   }, [id]);

//   if (loading) {
//     return <Spinner color="primary" />;
//   }

//   if (!activity) {
//     return <p>Activity not found</p>;
//   }

//   return (
//     <Card>
//       <CardImg top src={activity.activity_home_image} alt={activity.activity_title} />
//       <CardBody>
//         <CardTitle tag="h5">{activity.activity_title}</CardTitle>
//         <CardText>{activity.activity_summary}</CardText>
//         <CardText>{activity.description}</CardText>
//         <CardText><strong>Audience:</strong> {activity.audience.join(', ')}</CardText>
//         <CardText><strong>Type:</strong> {activity.activity_type.join(', ')}</CardText>
//       </CardBody>
//     </Card>
//   );
// };

// export default SingleActivity;
