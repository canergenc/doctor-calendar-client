import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/img/notfound.png';
import {
  Container

} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.jsx";

class NotFoundPage extends React.Component {
  render() {
    return (

      <>
        <UserHeader />
        <Container  fluid>

          <div>

            <img  src={PageNotFound} />
            <p style={{ textAlign: "center" }}>
              <Link to="/">Go to Home </Link>
            </p>

          </div>


        </Container>


      </>

    )
  }
}
export default NotFoundPage;