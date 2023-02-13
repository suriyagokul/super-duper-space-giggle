import React from "react";
import { CardDeck, Card, Button, CardGroup, Row, Col } from "react-bootstrap";
import AppointmentPage from "../components/Appointment";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"

export default function CardData(props) {
  const navigate = useNavigate();
  function handleClick(event) {
    console.log(event.target.innerHTML);    
  }
  return (
    <Card style={{ height: "500px" }} className="h-100">
      <Card.Img variant="top" src={props.image} />
      <Card.Body style={{ display: "flex", flexDirection: "column" }}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
        <Card.Text className="fw-bold">{props.price}</Card.Text>
        {/* <Button
          variant="primary"
          style={{ marginTop: "auto" }}
          onClick={handleClick}
        >
          {props.btntitle}
        </Button> */}
        <Link
          to="/appointment"
          state={{btn:props.btntitle}}
          className="btn btn-primary"
          style={{ marginTop: "auto" }}
          onClick={handleClick}
        >
          {props.btntitle}
        </Link>
      </Card.Body>
    </Card>
  );
}
