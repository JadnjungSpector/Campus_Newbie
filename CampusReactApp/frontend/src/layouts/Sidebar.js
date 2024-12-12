import React from "react";
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/IMG_1874.jpeg";
import { useUser } from "../views/ui/UserContext";
import probg2 from "../assets/images/bg/pastelbg.jpg";
import "./css/Sidebar.css";

const Sidebar = () => {
  const { user, isLoggedIn } = useUser();
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  const baseNavigation = [
    {
      title: "Profile",
      href: isLoggedIn ? "/profile" : "/login",
      icon: "bi bi-person-vcard",
    },
    {
      title: "Activity Home",
      href: "/cards",
      icon: "bi bi-house",
    },
  ];
  
   // Add Submit Activity only if user is logged in
   const navigation = isLoggedIn 
   ? [...baseNavigation, {
       title: "Submit Activity",
       href: "/submitActivity",
       icon: "bi bi-lightbulb",
     }]
   : baseNavigation;


  return (
    <div className="custom-sidebar">
      <div
        className="profilebg"
        style={{ background: `url(${probg2}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="80" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={showMobilemenu}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">
          Husker User: {user || "Guest"}
        </div>
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
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
