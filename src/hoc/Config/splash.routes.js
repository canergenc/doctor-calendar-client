
import GroupSplash from "../../containers/Splash/Group";
import LocationSplash from "../../containers/Splash/Location";


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
    
];
export default routes;
