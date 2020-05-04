import Index from "../../views/Index.jsx";
import Profile from "../../containers/Profile/Profile";
import Location from "../../containers/Locations/Locations";
import Person from "../../containers/Persons/Persons";
import Login from "../../containers/Login/Login"
import register from "../../containers/Register/Register";
import NotFoundPage from "../../containers/NotFound/NotFoundPage";




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
        path: "/persons",
        name: "Kullanıcı Tanımla",
        icon: "ni ni-shop text-primary",
        component: Person,
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
        component: register,
        layout: "/auth"
    },

    {
        path: "*",
        name: "NotFound",
        icon: "ni ni-active-40 text-primary",
        component: NotFoundPage,
        layout: "/auth"
    }

    
   

   
];
export default routes;
