import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import history from "../hoc/Config/history";
import routes from "../hoc/Config/admin.routes";
import { constants } from "../variables/constants";


class Admin extends React.Component {

  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      let token = localStorage.getItem(constants.TOKEN);
      if (!token) {
        return history.push("/auth/login");
      } else {
        if (prop.layout === "/admin") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        } else {
          return null;
        }
      }
    });
  };

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
    
      
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1 
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("../assets/img/brand/calendar-6.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
         
            
              {/* <NotificationNavbar 
                {...this.props}
                brandText={this.getBrandText(this.props.location.pathname)}
              /> */}
            

           
              <AdminNavbar 
                {...this.props}
                brandText={this.getBrandText(this.props.location.pathname)}
              />
            
         






          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>
            {/* <AdminFooter /> */}
          </Container>
        </div>
      </>
    );
  }
}

export default Admin;
