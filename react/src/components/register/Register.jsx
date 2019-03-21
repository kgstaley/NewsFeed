import React from "react";
import * as registerServices from "../../services/userServices";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup,
  InputGroup
} from "reactstrap";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: " ",
      password: ""
    };
  }

  componentDidMount = () => {
    console.log(`mounting register`);
  };

  render = () => {
    return (
      <Row>
        <Col>
          <Form>
            <FormGroup>
              <Input type="text" />
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  };
}

export default Register;
