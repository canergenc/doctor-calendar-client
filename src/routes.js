import Index from "views/Index.jsx";
import Profile from "containers/Profile/Profile.js";
import Register from "containers/Register/Register.js";
import Login from "containers/Login/Login.js";
import Location from "containers/Locations/Locations.js";

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
    path: "/location",
    name: "Lokasyon Tanımla",
    icon: "ni ni-shop text-primary",
    component: Location,
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
