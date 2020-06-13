import React, { createRef } from "react";
import Divider from "@material-ui/core/Divider";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  DropdownItem,
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
import List  from "components/List/index.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { servicesStaticData } from "constants/services.js";
import { Sticky } from "semantic-ui-react";
class Services extends React.Component {
  constructor(props) {
    super(props);
    var serviceData = {};
    this.state = {
      isValidService: false,
      serviceData: {},
      breadCrumbValues: [
        {
          href: "/",
          title: "Home",
        },
        {
          href: "/services",
          title: "Services",
        },
      ],
    };
    this.initiateRazorPay = this.initiateRazorPay.bind(this);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    const serviceName = this.props.match.params.serviceName;
    this.setState({ isValidService: false });
    this.state.breadCrumbValues.push({
      href: "/services/" + serviceName,
      title: serviceName,
    });
    var value = false;
    var data = {};
    this.setState(this.state.breadCrumbValues);
    Object.keys(servicesStaticData).forEach(function (key) {
      if (serviceName == key) {
        value = true;
        data = servicesStaticData[key];
      }
    });
    this.setState({ isValidService: value, serviceData: data });
  }

  openPayu(e) {
    e.preventDefault();
    var pd = {
      key: "leWetEpX",
      txnid: "175289e1-194b-479c-b29a-04a287b015ad",
      amount: "1000",
      firstname: "lovish",
      email: "lovishmittal21@gmail.com",
      phone: "9205852342",
      productinfo: "gst",
      surl: "https://sucess-url.in",
      furl: "https://failure-url.in",
      hash: "cb3f0baca19948794d58872cb695061d4c9804d0c0507551265ddbbd8ea",
      mode: "dropout",
    };
    var Handler = {
      responseHandler: function (BOLT) {
        alert(BOLT.response.txnStatus);
      },
      catchException: function (BOLT) {
        alert(BOLT.message);
      },
    };
    window.bolt.launch(pd, Handler);
  }

  initiateRazorPay(e) {
    e.preventDefault();
    var options = {
      key: "rzp_live_iaq2KrI3QdINha", // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "My Tax Planners",
      description: this.state.serviceData.title,
      image: "https://example.com/your_logo",
      order_id: "order_Etpo78aW6XXbCu", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#F37254",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  render() {
    this.contextRef = createRef();
    const serviceName = this.props.match.params.serviceName;
    const {serviceData} = this.state;
        return (
      <>
        <DemoNavbar type="notfixed" />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-teal"></div>
            <Container className="pt-lg-3">
              <Row className="justify-content-center">
                <Col xl="7" lg="6" md="12" sm="12" xs="12">
                  <Row>
                  {this.state.isValidService ? (
                    <React.Fragment>
                      <h1>
                        {" "}
                        {serviceData.title} 
                      </h1>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <h1> {serviceName} service is not Available</h1>
                    </React.Fragment>
                  )}
                  </Row>
                  <Row>
                    <List array={serviceData.title} />
                  </Row>
                </Col>
                <Col xl="5" lg="5" md="12" sm="12" xs="12">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody>
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
                              placeholder="Name"
                              type="text"
                              autoComplete="off"
                              name="Name"
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
                              placeholder="Phone Number"
                              type="text"
                              autoComplete="off"
                              name="phoneNumber"
                              onChange={this.handleChange}
                            />
                          </InputGroup>
                        </FormGroup>
                        {alert.message && (
                          <div className={`alert ${alert.type}`}>
                            {alert.message}
                          </div>
                        )}
                        <div className="text-center">
                          <Button
                            block="true"
                            className="my-4"
                            color="success"
                            type="button"
                            onClick={this.initiateRazorPay}
                          >
                            {" "}
                            Proceed to Checkout
                          </Button>
                        </div>
                        <div>
                          <Divider light />

                          <Button
                            block="true"
                            className="my-4"
                            color="primary"
                            type="button"
                            onClick={this.handleSubmit}
                          >
                            {" "}
                            Need Help? Get a Free Consultation
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

export default Services;
