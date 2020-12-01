import React, { Component } from "react";

import { Form, Col, Row, Card, CardBody } from "reactstrap";

class RegForm extends Component {
  form = React.createRef();

  state = {
  };

  render() {
    let i18n = this.props.i18n;

    return (
      <Row>
        <Col md={{ size: 12, order: 1 }} className="mt-3">
          <Card body style={{ marginBottom: '1rem' }} >
            <CardBody>

              <ol className="list-group ml-3">
                {this.props.list.map(questions => (
                  <li className="mb-3" key={questions.name}>
                    <div>
                      <h5 className="questionsTitle">{questions.title}</h5>
                    </div>
                    <div className="faq-text">
                      {questions.text}
                    </div>
                  </li>
                ))}
              </ol>

            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default RegForm;
