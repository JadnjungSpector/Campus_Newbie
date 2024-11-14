import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useAuth } from '../../contexts/AuthContext'; // Assuming you have an AuthContext
import Profile from '../Profile';

const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        setLoggedIn(true);
        navigate('/profile');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/create-account'); // Navigate to the create account page
  };

  return (
    <>
      <Profile />
      <Row className="justify-content-center">
        <Col md="6">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-box-arrow-in-right me-2"> </i>
              Login
            </CardTitle>
            <CardBody>
              {error && <div className="alert alert-danger">{error}</div>}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button 
                  color="primary" 
                  type="submit" 
                  block
                  style={{ backgroundColor: "#f9f1b3", borderColor: "#f9f1b3" }}
                >
                  Login
                </Button>
              </Form>
              <hr />
              <Button 
                color="secondary" 
                onClick={handleCreateAccount} 
                block
                style={{ backgroundColor: "#A886DE", borderColor: "#A886DE" }}
              >
                Create Account
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Login;