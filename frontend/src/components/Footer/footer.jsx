import React from "react";
import "./footer.css";
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

const Footer = () => {
  return (
    <>
      <Container fluid className="footer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-copyright"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#00abfb"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M14 9.75a3.016 3.016 0 0 0 -4.163 .173a2.993 2.993 0 0 0 0 4.154a3.016 3.016 0 0 0 4.163 .173" />
        </svg>{" "}
        2024 Insight. All rights reserved. Terms and Conditions
      </Container>
    </>
  );
};

export default Footer;
