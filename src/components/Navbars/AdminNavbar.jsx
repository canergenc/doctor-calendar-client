import React from "react";
import { Link } from "react-router-dom";
import history from "../../hoc/Config/history"
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';



// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from "reactstrap";

class AdminNavbar extends React.Component {


  logOut() {
    localStorage.clear();
    history.push('/');
  }



  componentDidMount() {
    if (!this.props.email) {
      this.props.getUserInfo();
    }

  }

  render() {

    return (
      <>

        
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">

          <Container fluid>
            <div
              className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            >
              {this.props.brandText }
            </div>

            <Nav className="align-items-center d-none d-md-flex" navbar >

              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media  className="align-items-center">
                    <span  style={{backgroundColor:'transparent'}}  className="avatar avatar-sm rounded-circle">
                      <img style={{backgroundColor:'transparent', width:'75%',height:'75%' }} 
                        alt="..."
                        src={require("assets/img/theme/notification-ico2.png")}
                      />
                    </span>
                   
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">BİLDİRİMLER</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/permission" tag={Link}>
                    <i className="ni ni-collection" />
                    <span>İzin Yönetimi</span>
                  </DropdownItem>
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Aktivite</span>
                  </DropdownItem> */}
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Ayarlar</span>
                  </DropdownItem> */}
                  <DropdownItem divider />
                  
                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <Media className="ml-1 d-none d-lg-block">
                      <span style={{marginRight:"30px"}} className="mb-0 text-sm font-weight-bold">
                        {this.props.fullName}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Hoşgeldiniz!!</h6>
                  </DropdownItem>
                  <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-single-02" />
                    <span>Profilim</span>
                  </DropdownItem>

                  
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Aktivite</span>
                  </DropdownItem> */}
                  {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Ayarlar</span>
                  </DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem href="#pablo" onClick={this.logOut}>
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


const mapStateToProps = state => {
  return {
    // email: state.userInfo.email,
    fullName: state.userInfo.fullName,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(actions.userInfoActions.getUserInfo()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);



