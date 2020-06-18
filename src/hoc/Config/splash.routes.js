
import GroupSplash from "../../containers/Splash/Group";
import LocationSplash from "../../containers/Splash/Location";
import NotFoundPage from "../../containers/NotFound/NotFoundPage";


var routes = [
    {
        path: "/index",
        name: "OOOPS",
        icon: "ni ni-tv-2 text-primary",
        component: GroupSplash,
        layout: "/splash"
    },

    {
        path: "/location",
        name: "OOOPS",
        icon: "ni ni-tv-2 text-primary",
        component: LocationSplash,
        layout: "/splash"
    },
    {
        path: "*",
        name: "NotFound",
        icon: "ni ni-active-40 text-primary",
        component: NotFoundPage,
        layout: "/splash"
    }

    
];
export default routes;
