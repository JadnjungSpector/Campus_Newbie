import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";

const About = () => {
  return (
    <Row>
      <Col>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            About Campus Newbie
          </CardTitle>
          <CardBody className="p-4">
            <Row >
              <Col lg="8">
                <h2 className="mt-4">Terms and Conditions</h2>
                <h5 className=" mb-4">
                Acknowledgment and Agreement before proceeding, please read  the following:
	1	User Responsibility: You acknowledge that all information provided during this process is accurate, truthful, and complete to the best of your knowledge.
	2	Verification Requirement: You understand that your submission may be subject to verification, and any discrepancies may result in delays or disqualification.
	3	Liability Disclaimer: By continuing, you agree to assume full responsibility for the accuracy of the provided information. We are not liable for any errors or omissions resulting from incorrect or incomplete submissions.
                </h5>

                <br />
                <Button
                  className="mt-3"
                  color="primary"
                  href="https://wrappixel.com/templates/materialpro-react-admin/?ref=33"
                  target="_blank"
                >
                  By proceeding you ackowledge these terms and conditions.
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default About;
