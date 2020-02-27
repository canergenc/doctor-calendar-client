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
import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Register from "views/examples/Register.jsx";
import Login from "views/examples/Login.jsx";
import Tables from "views/examples/Tables.jsx";
import Icons from "views/examples/Icons.jsx";
import Group from "views/settings/Group.jsx";

var routes = [
  {
    path: "/index",
    name: "Anasayfa",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Profil",
    icon: "ni ni-circle-08 text-primary",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/group",
    name: "Grup Tanımla",
    icon: "ni ni-vector text-primary",
    component: Group,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Lokasyon Tanımla",
    icon: "ni ni-shop text-primary",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "Rol Tanımla",
    icon: "ni ni-diamond text-primary",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
export default routes;
