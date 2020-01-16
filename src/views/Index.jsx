/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
import Calender from '../containers/Calender/Calender';
import Header from "components/Headers/Header.jsx";
import Doctors from '../containers/Doctors/Doctors';
class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };


  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>

            <Col className="mb-5 mb-xl-0" xl="10">
              <Calender />
            </Col>

            <Col xl="2">
              <Doctors />
            </Col>
          </Row>

        </Container>
        {/* Page content */}
      </>
    );
  }
}

export default Index;
