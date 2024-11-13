import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "Friend1",
    email: "friend1@gmail.com",

  },
  {
    avatar: user2,
    name: "Friend2",
    email: "friend2@gmail.com",

  },
  {
    avatar: user3,
    name: "Friend3",
    email: "friend3@gmail.com",

  },
  {
    avatar: user4,
    name: "Friend4",
    email: "friend4@gmail.com",
  },
  {
    avatar: user5,
    name: "Friend5",
    email: "friend5@gmail.com",
  },
];

const Friends = () => {
  return (
    <div>
      <Card>
        <CardBody>
          {/* Add the title here */}
          <CardTitle tag="h5" style={{ textAlign: "center", fontWeight: "bold" }}>
            Friends
          </CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top" style={{ textAlign: "center" }}>
                  <td>
                    <div className="d-flex justify-content-center align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0" style={{ fontSize: "1.4rem" }}>{tdata.name}</h6>
                        <span className="text-muted" style={{ fontSize: "0.9rem" }}>{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ textAlign: "center" }}>
            <Button
              className="btn"
              size="sm"
              style={{
                width: "150px",
                margin: "0 auto",
                backgroundColor: "#A886DE",
                borderColor: "#A886DE",
                color: "white"
              }}
            >
              Add New Friends
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Friends;