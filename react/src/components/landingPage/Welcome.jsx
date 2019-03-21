import React from "react";
import { Col, Button } from "reactstrap";
import * as styles from "./landingPage.module.css";

class Welcome extends React.PureComponent {
  render = () => {
    const { welcome, header, enter } = this.props;
    return (
      <Col>
        <h2 className={styles.Welcome}>{welcome}</h2>
        <h3 className={styles.LandingHeader}>{header}</h3>
        <div className={styles.EnterBtn}>
          <Button
            type="button"
            size="lg"
            outline
            color="secondary"
            onClick={enter}
          >
            Click to enter.
          </Button>
        </div>
      </Col>
    );
  };
}

export default Welcome;
