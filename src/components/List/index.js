import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

class List extends React.Component {
  componentDidMount() {
        console.log(this.props);
    }
  render() {
    return (
      <Container>
        <Row className=" row-grid align-items-center mb-5">
          <Col lg="6">
            <h3 className=" text-primary font-weight-light mb-2">
           THis will be a list of size 
            </h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default List;
