import React from "react";
import { Row, Col, Jumbotron, List } from "reactstrap";
import { AiOutlineCheck } from "react-icons/ai";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import AboutListItem from "./AboutListItem";
import "./scss/About.scss";

const About = () => {
  const CHALLENGE_LIST = [
    "Redux/Thunk to manage state",
    "User authentication",
    "Conditional rendering",
    "Spinners indicating loading state",
    "Real-time contact filtering",
  ];

  const TECH_STACK_LIST = [
    "Django",
    "Django REST Framework",
    "Custom JWT/CSRF Token Authentication",
    "React",
    "Redux/Thunk",
    "Axios",
  ];

  return (
    <div className="rounded">
      <Row id="about-content" className="g-0">
        <Col xs={12} md={{ size: 10, offset: 1 }} className="p-lg-3">
          <Jumbotron className="my-5 bg-secondary">
            <Row className="g-0 bg-primary pb-5">
              <Col xs={12} className="">
                <h1
                  id="about-title"
                  className="display-1 text-center bg-secondary py-2 border-bottom border-3 border-info"
                >
                  What is Contax?
                </h1>
              </Col>

              {/* WHAT IS CONTAX? */}
              <Col
                xs={10}
                md={8}
                lg={6}
                className="p-3 my-3 ms-1 ms-md-3 ms-lg-5 bg-light rounded shadow"
              >
                Contax is a contact manager created by Keegan Good to represent
                the culmination of one year of learning React.
                <div className="mt-3">
                  <span id="dev-time-label" className="small">
                    Development time to production:
                  </span>
                  <span className="ps-2">21 days</span>
                </div>
              </Col>

              {/* CHALLENGE LIST */}
              <Col
                xs={10}
                md={8}
                lg={6}
                className="mb-3 ms-auto me-1 me-md-3 me-lg-5 bg-light rounded shadow"
              >
                <h4 className="about-section-header display-4 bg-secondary p-3 rounded-top  border-bottom border-3 border-info">
                  Challenges
                </h4>
                <div className="about-section p-3 shadow">
                  <List type="unstyled" id="challenges-list">
                    {CHALLENGE_LIST.map((text) => (
                      <AboutListItem
                        text={text}
                        showDecoration={true}
                        key={text}
                      />
                    ))}
                  </List>
                </div>
              </Col>

              {/* TECH STACK LIST */}
              <Col
                xs={10}
                md={8}
                lg={6}
                className="mb-3 ms-1 ms-md-3 ms-lg-5 bg-light rounded"
              >
                <h4 className="about-section-header display-4 bg-secondary rounded-top p-3 border-bottom border-3 border-info">
                  <span>Tech Stack</span>
                  <IoExtensionPuzzleOutline className="mb-2 ms-2 p-1" />
                </h4>
                <div className="about-section p-3">
                  <List type="unstyled" id="challenges-list">
                    {TECH_STACK_LIST.map((text) => (
                      <AboutListItem
                        text={text}
                        showDecoration={false}
                        key={text}
                      />
                    ))}
                  </List>
                </div>
              </Col>
            </Row>
          </Jumbotron>
        </Col>
      </Row>
    </div>
  );
};

export default About;
