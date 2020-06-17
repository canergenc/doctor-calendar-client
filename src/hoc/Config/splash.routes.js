
import GroupSplash from "../../containers/Splash/Group";
import LocationSplash from "../../containers/Splash/Location";
import EmailCheckSplash from "../../containers/Splash/EmailCheck";
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
        path: "/emailCheck",
        name: "OOOPS",
        icon: "ni ni-tv-2 text-primary",
        component: EmailCheckSplash,
        layout: "/emailCheck"
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
