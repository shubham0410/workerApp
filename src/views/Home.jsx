import React from "react";
import { Link } from "react-router-dom";
import Typist from "react-typist";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import { commonActions } from "actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Dropdown, Image, Header, Dimmer } from "semantic-ui-react";
import {InitiateRequest} from "../components/InitiateRequestModal";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  Container,
  Row,Modal,
  Col,
} from "reactstrap";

// core components
import { DemoNavbar } from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.js";

// index page sections
import Download from "views/IndexSections/Download.js";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.locationOptions = [
      { key: "af", value: "Delhi", text: "Delhi" },
      { key: "ax", value: "Mumbai", text: "Mumbai" },
      { key: "al", value: "Bijnor", text: "Bijnor" },
      { key: "dz", value: "Bangalore", text: "Bangalore" },
      { key: "as", value: "Jaipur", text: "Jaipur" },
      { key: "ad", value: "Ambah", text: "Ambah" },
      { key: "ao", value: "Maharajganj", text: "Maharajganj" },
      { key: "ai", value: "Noida", text: "Noida" },
      { key: "ag", value: "Chennai", text: "Chennai" },
      { key: "ar", value: "Kolkata", text: "Kolkata" },
      { key: "am", value: "Random 1", text: "Random 1" },
      { key: "aw", value: "Random 2", text: "Random 2" },
      { key: "au", value: "Random 3", text: "Random 3" },
      { key: "at", value: "Random 4", text: "Random 4" },
      { key: "az", value: "Random 5", text: "Random 5" },
      { key: "bs", value: "Random 6", text: "Random 6" },
      { key: "bh", value: "Random 7", text: "Random 7" },
      { key: "bd", value: "Random 8", text: "Random 8" },
      { key: "bb", value: "Random 9", text: "Random 9" },
      { key: "by", value: "Random 10", text: "Random 10" },
      { key: "be", value: "Random 11", text: "Random 11" },
      { key: "bz", value: "Random 12", text: "Random 12" },
      { key: "bj", value: "Random 13", text: "Random 13" },
    ];
    this.serviceOptions = [
      { key: "am", value: "Service 1", text: "Service 1" },
      { key: "aw", value: "Service 2", text: "Service 2" },
      { key: "au", value: "Service 3", text: "Service 3" },
      { key: "at", value: "Service 4", text: "Service 4" },
      { key: "az", value: "Service 5", text: "Service 5" },
      { key: "bs", value: "Service 6", text: "Service 6" },
      { key: "bh", value: "Service 7", text: "Service 7" },
      { key: "bd", value: "Service 8", text: "Service 8" },
      { key: "bb", value: "Service 9", text: "Service 9" },
      { key: "by", value: "Service 10", text: "Service 10" },
      { key: "be", value: "Service 11", text: "Service 11" },
      { key: "bz", value: "Service 12", text: "Service 12" },
      { key: "bj", value: "Service 13", text: "Service 13" }, 
      { key: "af", value: "Service 14", text: "Service 14" },
      { key: "ax", value: "Service 15", text: "Service 15" },
      { key: "al", value: "Service 16", text: "Service 16" },
      { key: "dz", value: "Service 17", text: "Service 17" },
      { key: "as", value: "Service 18", text: "Service 18" },
      { key: "ad", value: "Service 19", text: "Service 19" },
      { key: "ao", value: "Service 20", text: "Service 20" },
      { key: "ai", value: "Service 21", text: "Service 21" },
      { key: "ag", value: "Service 22", text: "Service 22" },
      { key: "ar", value: "Service 23", text: "Service 23" },
    ];
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  handleChange(e, data) {
    this.setState({ [data.name]: data.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { formData } = this.state;
    if (formData.name && formData.email && formData.message) {
      this.props.submitContactUsForm(formData);
    } else {
      alert("Please fill some data");
    }
  }
  render() {
    const { formData, location, service } = this.state;
    const { submitted, alert } = this.props;
    const {dimmer} = "inverted";

    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* Hero for FREE version */}
            <section className="section section-hero section-shaped">
              {/* Background circles */}
              <div className="shape shape-style-1 shape-default">
                <span className="span-150" />
                <span className="span-50" />
                <span className="span-50" />
                <span className="span-75" />
                <span className="span-100" />
                <span className="span-75" />
                <span className="span-50" />
                <span className="span-100" />
                <span className="span-50" />
                <span className="span-100" />
              </div>
              <Container className="shape-container d-flex align-items-center py-lg pt-lg-0">
                <div className="col px-0">
                  <Row className="align-items-center justify-content-center">
                    <Col className="text-center" lg="6">
                      <p className="lead text-white">
                        Raise a service request, and get work done
                      </p>
                      <Row>
                        <Col lg="6">
                      <Dropdown
                        placeholder="Select Location"
                        fluid
                        search
                        selection
                        scrolling
                        options={this.locationOptions}
                        value = {location}
                        name="location"
                        onChange={this.handleChange}
                      /></Col>
                       <Col lg="6">
                      <Dropdown
                        placeholder="Select Service"
                        fluid
                        search
                        selection
                        scrolling
                        options={this.serviceOptions}
                        value = {service}
                        name="service"
                        onChange={this.handleChange}
                      /></Col>
                      </Row>
                      <div className="btn-wrapper mt-5">
                        <Button
                          className="btn-white btn-icon mb-3 mb-sm-0"
                          color="default"
                          size="lg"
                          onClick={() => this.toggleModal("formModal")}
                        >
                          <span className="btn-inner--icon mr-1">
                            <i className="ni ni-send" />
                          </span>
                          <span className="btn-inner--text">
                            Start Request 
                          </span>
                          
                        </Button>{" "}
                        <Button
                          className="btn-icon mb-3 mb-sm-0"
                          color="github"
                          size="lg"
                          target="_blank"
                        >
                          <span className="btn-inner--text">
                            <span className="text-warning mr-1">Can Provide Service?</span>
                            Register yourself
                          </span>
                        </Button>
                         <Modal
              className="modal-dialog-centered"
              backdropClassName = "modal-backdrop-new"
              size="lg"
              backdrop="false"
              isOpen={this.state.formModal}
              toggle={() => this.toggleModal("formModal")}
            > <InitiateRequest location={this.state.location} service={this.state.service}></InitiateRequest></Modal>
            {/* <Modal size='tiny' dimmer={dimmer} open={this.state.formModal} onClose={() => this.toggleModal("formModal")}
            centered='true'>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size='medium'
              src='https://react.semantic-ui.com/images/avatar/large/rachel.png'
            />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>
                We've found the following gravatar image associated with your
                e-mail address.
              </p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={() => this.toggleModal("formModal")}>
              Nope
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Yep, that's me"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal> */}
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew zindex-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
          </div>
          <section className="section pt-lg-0 pt-sm-0 pt-md-0">
            <Container>
              <Row className="justify-content-center">
                <h3 className="mt-3 mb-5">Our Popular Services</h3>
                <span className="separator"></span>
                <Col lg="12">
                  <Row className="row-grid">
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-primary rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h6 className="text-primary text-uppercase">
                            Download Argon
                          </h6>
                          <p className="description mt-3">
                            Argon is a great free UI package based on Bootstrap
                            4 that includes the most important components and
                            features.
                          </p>
                          <div>
                            <Badge color="primary" pill className="mr-1">
                              design
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              system
                            </Badge>
                            <Badge color="primary" pill className="mr-1">
                              creative
                            </Badge>
                          </div>
                          <Button
                            className="mt-4"
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Learn more
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-success rounded-circle mb-4">
                            <i className="ni ni-istanbul" />
                          </div>
                          <h6 className="text-success text-uppercase">
                            Build Something
                          </h6>
                          <p className="description mt-3">
                            Argon is a great free UI package based on Bootstrap
                            4 that includes the most important components and
                            features.
                          </p>
                          <div>
                            <Badge color="success" pill className="mr-1">
                              business
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                              vision
                            </Badge>
                            <Badge color="success" pill className="mr-1">
                              success
                            </Badge>
                          </div>
                          <Button
                            className="mt-4"
                            color="success"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Learn more
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape icon-shape-warning rounded-circle mb-4">
                            <i className="ni ni-planet" />
                          </div>
                          <h6 className="text-warning text-uppercase">
                            Prepare Launch
                          </h6>
                          <p className="description mt-3">
                            Argon is a great free UI package based on Bootstrap
                            4 that includes the most important components and
                            features.
                          </p>
                          <div>
                            <Badge color="warning" pill className="mr-1">
                              marketing
                            </Badge>
                            <Badge color="warning" pill className="mr-1">
                              product
                            </Badge>
                            <Badge color="warning" pill className="mr-1">
                              launch
                            </Badge>
                          </div>
                          <Button
                            className="mt-4"
                            color="warning"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Learn more
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg pt-lg-0 pt-sm-0 pt-md-0">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    className="img-fluid floating"
                    src={require("assets/img/theme/promo-1.png")}
                  />
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                      <i className="ni ni-settings-gear-65" />
                    </div>
                    <h3>Awesome features</h3>
                    <p>
                      The kit comes with three pre-built pages to help you get
                      started faster. You can change the text and images and
                      you're good to go.
                    </p>
                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-settings-gear-65" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">
                              Carefully crafted components
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-html5" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">Amazing page examples</h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-satisfied" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">
                              Super friendly support team
                            </h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section bg-secondary">
            <Container>
              <Row className="row-grid align-items-center">
                <Col md="6">
                  <Card className="bg-default shadow border-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/img-1-1200x1000.jpg")}
                      top
                    />
                    <blockquote className="card-blockquote">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-bg"
                        preserveAspectRatio="none"
                        viewBox="0 0 583 95"
                      >
                        <polygon
                          className="fill-default"
                          points="0,52 583,95 0,95"
                        />
                        <polygon
                          className="fill-default"
                          opacity=".2"
                          points="0,42 583,95 683,0 0,95"
                        />
                      </svg>
                      <h4 className="display-3 font-weight-bold text-white">
                        Design System
                      </h4>
                      <p className="lead text-italic text-white">
                        The Arctic Ocean freezes every winter and much of the
                        sea-ice then thaws every summer, and that process will
                        continue whatever happens.
                      </p>
                    </blockquote>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
          <Download />
        </main>
        <CardsFooter />
      </>
    );
  }
}
function mapState(state) {
  const { submitted } = state.common;
  const { alert } = state;
  return { submitted, alert };
}

const actions = {
  submitContactUsForm: commonActions.submitContactUsForm,
};
const connectedHomePage = connect(mapState, actions)(Home);
export { connectedHomePage as Home };
