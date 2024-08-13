import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import insightLogo from "../../assets/insightLogo.png";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import ContactForm from "../contact";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={insightLogo}
            className="img-fluid me-2"
            alt="Insight Logo"
            width={75}
          />
          Insight
        </div>
        {/* <div className="navbar-center">
        <input type="text" placeholder="Search..." className="navbar-search" />
      </div> */}
        <div className="navbar-right">
          <Button onClick={handleOpenModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-phone-call"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
              <path d="M15 7a2 2 0 0 1 2 2" />
              <path d="M15 3a6 6 0 0 1 6 6" />
            </svg>{" "}
            Contact Us
          </Button>
        </div>
      </nav>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContactForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
