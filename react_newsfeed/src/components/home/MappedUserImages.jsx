import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody } from "reactstrap";
import * as styles from "./homepage.module.css";

const MappedUserImages = ({ files }) => {
  return files.map(file => {
    const awsImage = `https://sabio-s3.s3.us-west-2.amazonaws.com/${
      file.FileUrl
    }`;
    return (
      <div key={file.Id}>
        <Row className={styles.FlexContainer}>
          <Col sm={{ size: 4 }}>
            <Card className={styles.UserUploadCards}>
              <CardBody>
                <p>{file.FileName}</p>
                <img
                  src={awsImage}
                  alt="userUpload"
                  className={styles.UserUploadImages}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  });
};

MappedUserImages.propTypes = {
  files: PropTypes.array
};

export default React.memo(MappedUserImages);
