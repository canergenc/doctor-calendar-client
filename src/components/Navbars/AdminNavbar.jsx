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
import { Link } from "react-router-dom";
// reactstrap components
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";
import axios from '../../axios-orders';

class AdminNavbar extends React.Component {

  state = {
    locations: []
  }

  componentDidMount() {
    console.log('[AdminNavbar] componentWillMount')
    axios.get('/locations.json')
      .then(res => {
        const locations = [];
        for (let key in res.data) {
          if (key !== "0") {
            locations.push({
              ...res.data[key],
              id: key
            });
          }
        }
        this.setState({ loading: false, locations: locations });
      })
      .catch(err => {
        this.setState({ loading: true });
      });
  }

  render() {
    const toggle = () => { }
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">

          <Container fluid>
            <Link
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
              to="/"
            >
              {this.props.brandText}
            </Link>

                {/* <select
                    className="dropdown-menu-right"
                    value="test"
                    onChange={this.toggle} >
                    {this.state.locations.map(location => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select> */}

                    {/* <Dropdown isOpen={false} toggle={toggle} nav>
                      <DropdownMenu className="dropdown-menu-arrow">

                        {this.state.locations.map((location) => (
                          <DropdownItem className="noti-title" key={location.id}>
                            {location.name}
                          </DropdownItem>
                        ))} 

                      </DropdownMenu>
                    </Dropdown> */}
            <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">

                      <span className="mb-0 text-sm font-weight-bold">
                      Samatya Hastanesi
                      </span>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  {this.state.locations.map((location) => (
                          <DropdownItem className="noti-title" key={location.id}>
                            {location.name}
                          </DropdownItem>
                        ))} 
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        Doctor Trash
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Hoşgeldiniz!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Profilim</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-settings-gear-65" />
                    <span>Ayarlar</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Aktivite</span>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Ayarlar</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    <i className="ni ni-user-run" />
                    <span>Çıkış</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
