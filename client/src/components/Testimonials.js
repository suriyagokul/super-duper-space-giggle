import React from "react";
import { CardDeck, Card } from "react-bootstrap";

function Testimonials() {
  return (
    <>
      <h2 className="mt-2 mb-3">Testimonials</h2>
      <div>
        <Card className="mb-2">
          <Card.Body>
            <Card.Title>Great Service</Card.Title>
            <Card.Text>
              I was really impressed with the convenience and professionalism of
              the door-to-door healthcare service. The virtual visit with the
              doctor was just as good as an in-person visit, and it was so much
              easier to have the medication delivered to my door. I will
              definitely be using this service again in the future.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">John S.</small>
          </Card.Footer>
        </Card>
        <Card className="mb-2">
          <Card.Body>
            <Card.Title>Saved the Day</Card.Title>
            <Card.Text>
              I was feeling really sick and didn't want to leave my house to go
              to the doctor. The door-to-door healthcare service was a
              lifesaver. The doctor was able to diagnose my illness and
              prescribe medication all through a virtual visit. I received the
              medication the next day and was feeling much better within a few
              days. I am so grateful for this service.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Sara K.</small>
          </Card.Footer>
        </Card>
        <Card className="mb-2">
          <Card.Body>
            <Card.Title>Easy and Efficient</Card.Title>
            <Card.Text>
              The door-to-door healthcare service was so easy to use. I was able
              to schedule a virtual visit with a doctor and get my prescription
              medications delivered all through the website. The process was
              efficient and I appreciated not having to make an extra trip to
              the pharmacy.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Jason W.</small>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
}

export default Testimonials;
