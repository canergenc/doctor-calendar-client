import Index from "../../views/Index.jsx";
import Profile from "../../containers/Profile/Profile";
import Location from "../../containers/Locations/Locations";
import Person from "../../containers/Persons/Persons";
import Login from "../../containers/Login/Login"
import PasswordForgot from "../../containers/Login/PasswordForgot"

import register from "../../containers/Register/Register";
import ResetPassword from "../../containers/Login/ResetPassword";

import NotFoundPage from "../../containers/NotFound/NotFoundPage";

import EmailConfirm from "../../containers/Login/EmailConfirm";





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
        path: "/reset-password/:email/:token",
        name: "Şifre Değiştir",
        icon: "ni ni-circle-08 text-pink",
        hash: "#the-hash",
        component: ResetPassword,
        layout: "/auth"
    },


    {
        path: "/confirm-email/:email/:key",
        name: "Email Doğrula",
        icon: "ni ni-circle-08 text-pink",
        hash: "#the-hash",
        component: EmailConfirm ,
        layout: "/auth"
    },



    {
        path: "/password-forgot",
        name: "Şifremi Unuttum",
        icon: "ni ni-active-40 text-primary",
        component: PasswordForgot,
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
