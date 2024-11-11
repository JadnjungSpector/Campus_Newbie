import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/IMG_1874.jpeg";
// import probg from "../assets/images/bg/download.jpg";
import probg2 from "../assets/images/bg/pastelbg.jpg";

// Import the CSS file
import './css/Sidebar.css';

const navigation = [
  {
    title: "Profile",
    href: "/table",
    icon: "bi bi-person-vcard",
  },
  {
    title: "Activity Home",
    href: "/cards",
    icon: "bi bi-house",
  },
  // {
  //   title: "Profile Hidden",
  //   href: "/starter",
  //   icon: "bi bi-shield-lock",
  // },
  {
    title: "Alert",
    href: "/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "Badges",
    href: "/badges",
    icon: "bi bi-patch-check",
  },
  {
    title: "Submit Activity",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  },
  // {
  //   title: "Grid",
  //   href: "/grid",
  //   icon: "bi bi-columns",
  // },
  // {
  //   title: "Forms",
  //   href: "/forms",
  //   icon: "bi bi-textarea-resize",
  // },
  // {
  //   title: "Breadcrumbs",
  //   href: "/breadcrumbs",
  //   icon: "bi bi-link",
  // },
  // {
  //   title: "About",
  //   href: "/about",
  //   icon: "bi bi-people",
  // },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="custom-sidebar">
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg2}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="80" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">Jordyn Manning</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          {/* <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://wrappixel.com/templates/materialpro-react-admin/?ref=33"
          >
            Upgrade To Pro
          </Button> */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
