import Index from "../../views/Index";
import Profile from "../../containers/Profile/Profile.js";
import Location from "../../containers/Locations/Locations.js";
import Person from "../../containers/Persons/Persons.js";
import PermissionApprove from "../../containers/Request-Approve/PermissionApprove.js";


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
        icon: "ni ni-collection text-primary",
        component: Person,
        layout: "/admin"
    },

    {
        path: "/permission-approve",
        name: "İzin-Onay",
        icon: "ni ni-active-40 text-primary",
        component: PermissionApprove,
        layout: "/admin"
    },
    // {
    //     path: "/login",
    //     name: "Login",
    //     icon: "ni ni-key-25 text-info",
    //     component: Login,
    //     layout: "/auth"
    // },
    // {
    //     path: "/register",
    //     name: "Register",
    //     icon: "ni ni-circle-08 text-pink",
    //     component: Register,
    //     layout: "/auth"
    // }
];
export default routes;
