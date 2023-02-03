import React from "react";
import { ListGroup } from "react-bootstrap";

function About() {
  return (
    <div className="p-3 m-3">
      <h2>About</h2>
      <p>
        Our door-to-door healthcare service provides top-quality medical care
        right in the comfort of your own home. Our team of highly-skilled
        doctors and medical professionals are available to visit you at a time
        that is convenient for you. Whether you are recovering from an illness
        or injury, or simply in need of a routine check-up, we are here to
        provide you with the personalized care you need. With our home-visit
        service, you can avoid the hassle of traveling to a clinic or hospital,
        and instead receive high-quality medical care in the familiar
        surroundings of your own home.
      </p>
      <h3 className="mb-3">Safety Measures</h3>
      <ListGroup className="mb-3">
        <ListGroup.Item>
          All of our healthcare providers wear personal protective equipment
          (PPE) while on visits.
        </ListGroup.Item>
        <ListGroup.Item>
          We use hospital-grade disinfectant to clean all of our equipment
          before and after each visit.
        </ListGroup.Item>
        <ListGroup.Item>
          We follow all recommended guidelines from the Centers for Disease
          Control and Prevention (CDC) to ensure the safety of our patients and
          healthcare providers.
        </ListGroup.Item>
      </ListGroup>
      <h3 className="mb-3">
        The qualifications and experience of the medical professionals providing
        the services:
      </h3>
      <p>
        All of the medical professionals providing services through the
        door-to-door healthcare service are highly-skilled and experienced in
        their field. They possess the necessary qualifications and
        certifications to provide the highest quality of care to patients.
        Information on the team's education and certifications would be useful
        here.
      </p>
      <h3 className="mb-3">Accreditations</h3>
      <p>
        We are licensed by the state medical board and are fully accredited by
        the Joint Commission.
      </p>
    </div>
  );
}

export default About;
