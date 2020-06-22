import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import { connect } from "react-redux";
import { userActions } from "actions/user.actions";
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
  Modal,
  Row,
  Col,
} from "reactstrap";
import { timers } from "jquery";

class InitiateRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { address, count, startTime, endTime } = this.state;
    const min = 1;
    const max = 1000000;
    const rand =  Math.floor(Math.random() * max) + min ;
    if (address && count) {
      console.log(this.props);
      const request = {
        address: address,
        count: count,
        startTime: startTime,
        endTime: endTime,
        category: this.props.service,
        location: this.props.location,
        requestId: rand,
        userId: this.props.user.name,
      };
      this.props.raiseRequest(request);
    } else {
      alert("fill all mandatory data");
    }
  }
  render() {
    const { location, service, raisingRequest, alert , requestData} = this.props;
    const { address, count, startTime, endTime } = this.state;
    console.log(this.props);
    return (
      <>
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-white pb-5">
              <div className="text-muted text-center">
                <h3>
                  Please provide below details to Create a Request for {service}{" "}
                  in {location}
                </h3>
              </div>
            </CardHeader>
            {alert.message ? (
                        <div className={`alert ${alert.type}`}>
                          {alert.message} {alert.type == "alert-success" ? ( <span>Your Request Id is : {requestData.requestId}</span>):""}
                        </div>
                       
                      ) : (
                        <React.Fragment>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup
                  className={classnames("mb-3", {
                    focused: this.state.fullAddressFocused,
                  })}
                >
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Full Address"
                      type="text"
                      onFocus={(e) =>
                        this.setState({ fullAddressFocused: true })
                      }
                      onBlur={(e) =>
                        this.setState({ fullAddressFocused: false })
                      }
                      value={address}
                      name="address"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup
                  className={classnames("mb-3", {
                    focused: this.state.countRequiredFocused,
                  })}
                >
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Count Required"
                      type="text"
                      onFocus={(e) =>
                        this.setState({ countRequiredFocused: true })
                      }
                      onBlur={(e) =>
                        this.setState({ countRequiredFocused: false })
                      }
                      value={count}
                      name="count"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup
                  className={classnames("mb-3", {
                    focused: this.state.startDateFocused,
                  })}
                >
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Preferred Start date and time"
                      type="text"
                      onFocus={(e) => this.setState({ startDateFocused: true })}
                      onBlur={(e) => this.setState({ startDateFocused: false })}
                      value={startTime}
                      name="startTime"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup
                  className={classnames("mb-3", {
                    focused: this.state.endDateFocused,
                  })}
                >
                  <InputGroup className="input-group-alternative">
                    <Input
                      placeholder="Preferred Service end date and time"
                      type="text"
                      onFocus={(e) => this.setState({ endDateFocused: true })}
                      onBlur={(e) => this.setState({ endDateFocused: false })}
                      value={endTime}
                      name="endTime"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    onClick={this.handleSubmit}
                  >
                    {raisingRequest ? (
                                <CircularProgress
                                  size={24}
                                  className="button-progress"
                                />
                              ) : (
                                "Submit"
                              )}
                  </Button>
                </div>
              </Form>
            </CardBody>
            </React.Fragment>
                      )}
          </Card>
        </div>
      </>
    );
  }
}
function mapState(state) {
  console.log(state);
  const { alert } = state;
  const { user } = state.authentication;
  const {raisingRequest, requestData} = state.users;
  return { alert, user , raisingRequest,requestData};
}

const actionCreators = {
  raiseRequest: userActions.raiseRequest,
};

const connectedInitiateRequestPage = connect(
  mapState,
  actionCreators
)(InitiateRequest);
export { connectedInitiateRequestPage as InitiateRequest };
