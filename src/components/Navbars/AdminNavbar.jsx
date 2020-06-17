import React from "react";
import { Link } from "react-router-dom";
import history from "../../hoc/Config/history"
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { permissionHelper } from "../../containers/Permission/PermissionHelper";


// reactstrap components
import {
  Badge,
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
      this.props.getPermissionsCount(permissionHelper.getWaitingForApproveFilter(0));
    }

  }

  render() {

    return (
      <>


        <Navbar className="navbar-top navbar-dark" expand="xl" id="navbar-main">

          <Container fluid>
            <div
              className="h4 mb-0 text-white text-uppercase d-none d-xl-inline-block"
            >
              {this.props.brandText}
            </div>

            <Nav className="align-items-center d-none d-xl-flex" navbar >

              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span style={{ backgroundColor: 'transparent' }} className="avatar avatar-sm rounded-circle">
                      <img style={{ backgroundColor: 'transparent', width: '75%', height: '75%' }}
                        alt="..."
                        src={require("../../assets/img/theme/notification-ico2.png")}
                      />
                      {

                        this.props.unapprovedPermissionCount > 0 &&
                        <Badge
                          style={{ color: 'white', backgroundColor: 'rgb(251, 99, 64)', marginLeft: '-4px', marginBottom: '-12px', fontSize: '10pt' }}

                        >
                          {this.props.unapprovedPermissionCount}
                        </Badge>
                      }
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
                  <DropdownItem divider />

                </DropdownMenu>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <Media className="ml-1 d-none d-lg-block">
                      <span style={{ marginRight: "30px" }} className="mb-0 text-sm font-weight-bold">
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

                  <DropdownItem divider />

                  <DropdownItem onClick={this.logOut}>
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
    unapprovedPermissionCount: state.permission.permissionCount
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: () => dispatch(actions.userInfoActions.getUserInfo()),
    getPermissionsCount: (filter) => dispatch(actions.permission.getPermissionsCount(filter))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);



