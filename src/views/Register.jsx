import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "actions/user.actions";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import CircularProgress from "@material-ui/core/CircularProgress";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import { DemoNavbar } from "components/Navbars/DemoNavbar.jsx";
import SimpleFooter from "components/Footers/SimpleFooter.js";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        password: "",
      },
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }
  responseFacebook = (response) => {
    console.log(response);
    if (response.error != undefined) {
      alert(response.error);
    } else {
      const { user } = this.state;
      user.name = response.name;
      user.email = response.name;
      user.password = response.userId;
      this.props.register(user);
    }
  };
  responseGoogle = (response) => {
    console.log(response);
    if (response.error != undefined) {
      alert(response.error);
    } else {
      const { user } = this.state;
      user.name = response.profileObj.email;
      user.email = response.profileObj.email;
      user.password = response.profileObj.googleId;
      this.props.register(user);
    }
  };
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.name && user.email && user.password) {
      this.props.register(user);
    } else {
      alert("Please fill some data");
    }
  }
  render() {
    const { registering, alert } = this.props;
    const { user, submitted } = this.state;
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign up with</small>
                      </div>
                      <div className="text-center">
                        <FacebookLogin
                          appId="2414600271974265"
                          autoLoad={false}
                          fields="name,email,picture"
                          scope="public_profile"
                          textButton="FACEBOOK"
                          callback={this.responseFacebook}
                          cssClass="btn btn-neutral btn-icon mr-4"
                          icon={
                            <span className="btn-inner--icon mr-1">
                              <img
                                alt="..."
                                src={require("assets/img/icons/common/facebook.svg")}
                              />
                            </span>
                          }
                        ></FacebookLogin>
                        <GoogleLogin
                          clientId="746727129966-7pscnnpcroufl82uhg3ufo45204fo6hv.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                          buttonText="LOGIN WITH GOOGLE"
                          render={(renderProps) => (
                            <Button
                              className="btn-neutral btn-icon ml-1"
                              color="default"
                              onClick={renderProps.onClick}
                            >
                              <span className="btn-inner--icon mr-1">
                                <img
                                  alt="..."
                                  src={require("assets/img/icons/common/google.svg")}
                                />
                              </span>
                              <span className="btn-inner--text">Google</span>
                            </Button>
                          )}
                          onSuccess={this.responseGoogle}
                          onFailure={this.responseGoogle}
                        />
                      </div>
                    </CardHeader>
                    <CardBody className="px-md-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                      </div>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Name"
                              type="text"
                              name="name"
                              value={user.name}
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              name="email"
                              value={user.email}
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              name="password"
                              value={user.password}
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-muted font-italic">
                          <small>
                            password strength:{" "}
                            <span className="text-success font-weight-700">
                              strong
                            </span>
                          </small>
                        </div>
                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input
                                className="custom-control-input"
                                id="customCheckRegister"
                                type="checkbox"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckRegister"
                              >
                                <span>
                                  I agree with the{" "}
                                  <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    Privacy Policy
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        {alert.message && (
                          <div className={`alert ${alert.type}`}>
                            {alert.message}
                          </div>
                        )}
                        <div className="text-center">
                          <Button
                            block="true"
                            className="mt-4"
                            color="primary"
                            type="button"
                            onClick={this.handleSubmit}
                          >
                            {registering ? (
                              <CircularProgress
                                size={24}
                                className="button-progress"
                              />
                            ) : (
                              " Create account"
                            )}
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  const { registering } = state.registration;
  return { alert, registering };
}

const actionCreators = {
  register: userActions.register,
};

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export { connectedRegisterPage as Register };
