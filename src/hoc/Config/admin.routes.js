import Index from "../../views/Index.jsx";
import Profile from "../../containers/Profile/Profile.js";
import GroupSettings from "../../containers/GroupSettings/GroupSettings.js";
import Location from "../../containers/Locations/Locations.js";
import Person from "../../containers/Persons/Persons.js";
import Permission from "../../containers/Permission/Permission.js";
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
        path: "/group",
        name: "Takvim Ayarları",
        icon: "ni ni-calendar-grid-58 text-primary",
        component: GroupSettings,
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
        path: "/permission",
        name: "İzin Yönetimi",
        icon: "ni ni-active-40 text-primary",
        component: Permission,
        layout: "/admin"
    },

    {
        path: "*",
        name: "NotFound",
        icon: "ni ni-circle-08 text-pink",
        component: NotFoundPage,
        layout: "/admin"
    }
];
export default routes;
