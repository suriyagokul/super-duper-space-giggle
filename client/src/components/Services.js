import React from "react";
import CardData from "../helper/Carddata";
import { Row, Col } from "react-bootstrap";
import {Link} from "react-router-dom"
import Layout from "./Layout";
import "../index.css"
import AppointmentPage from "./Appointment";


function Services() {
  function handleClick() {}
    <AppointmentPage purpose="Doctor Visits"></AppointmentPage>
  return (
    
    <div className="mb-3">
      <Layout></Layout>
      <div class="m-5">
      <h2 className="mt-3">Our Services</h2>

      <Row xs={1} md={3} className="g-4">
        <Col className="col-sm-12">
          <CardData
            
            id="1"
            image="https://media.istockphoto.com/id/1210318350/vector/doctor-at-home.jpg?s=612x612&w=0&k=20&c=gHcXkwpiLw9Rrn7cQ01pCRJyIRonfzQ_P2c4vwnA9GM="
            title="Doctor Visits"
            text="Our team of highly-skilled doctors and medical professionals are available to visit you at a time that is convenient for you."
            price="Fee: 300/-"
            btntitle="Doctor Consultation"
          />
        </Col>
        <Col>
          <CardData
            id="2"
            image="https://pharmanewsintel.com/images/site/article_headers/_normal/2019-11-20-Pharma-drug-costs.png"
            title="Medication Delivery"
            text="Have your prescription medications delivered directly to your
          door."
            price="Fee: Varies"
            btntitle="Prescription Delivery"
          />
        </Col>
        <Col>
          <CardData
            id="3"
            image="https://medlineplus.gov/images/LaboratoryTests_share.jpg"
            title="Lab Tests"
            text=" Get lab tests performed in the convenience of your own home."
            price="Fee: Varies"
            btntitle="Diagnostic Testing"
          />
        </Col>
        <Col>
          <CardData
            id="4"
            image="https://thumbs.dreamstime.com/b/doctor-nurse-ambulance-car-first-aid-vehicle-vector-illustration-medical-healthcare-center-emergency-service-hospital-staff-173125168.jpg"
            title="Emergency"
            text=" Get lab tests performed in the convenience of your own home."
            price="Fee: Varies"
            btntitle="Immediate Care  "
          />
        </Col>
      </Row>
    </div>
    </div>
    
  );
}

export default Services;
