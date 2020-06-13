import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions/user.actions";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import CircularProgress from "@material-ui/core/CircularProgress";

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

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();
    this.state = {
      name: "",
      password: "",
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  responseFacebook = (response) => {
    if (response.error != undefined) {
      alert(response.error);
    } else {
      this.props.login(response.name, response.userId);
    }
  };
  responseGoogle = (response) => {
    console.log(response);
    if (response.error != undefined) {
      alert(response.error);
    } else {
      this.props.login(response.profileObj.email, response.profileObj.googleId);
    }
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { name, password } = this.state;
    if (name && password) {
      this.props.login(name, password);
    }
  }
  render() {
    const { loggingIn, alert } = this.props;
    const { name, password, submitted } = this.state;
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
                        <small>Sign in with</small>
                      </div>
                      <div className="btn-wrapper text-center">
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
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Or sign in with credentials</small>
                      </div>
                      <Form role="form">
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email"
                              type="email"
                              value={name}
                              name="name"
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
                              value={password}
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        {alert.message && (
                          <div className={`alert ${alert.type}`}>
                            {alert.message}
                          </div>
                        )}
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button
                            block="true"
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={this.handleSubmit}
                          ></Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a className="text-light" href="/register-page">
                        <small>Create new account</small>
                      </a>
                    </Col>
                  </Row>
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
  const { loggingIn } = state.authentication;
  return { alert, loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };
