import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const Blog = ({ id, image, title, subtitle, text, color, onClick }) => {
  return (
    <Card>
      <CardImg alt="Card image cap" src={image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{title}</CardTitle>
        <CardSubtitle>{subtitle}</CardSubtitle>
        <CardText className="mt-3">{text}</CardText>
        <Button color={color} onClick={onClick}>Check it out</Button> {/* Use onClick as is */}
      </CardBody>
    </Card>
  );
};

export default Blog;



 
