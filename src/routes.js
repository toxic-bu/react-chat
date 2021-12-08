import { LOGIN_ROUTE, CHAT_ROUTE, CREATE_USER_ROUTE } from "./utils/consts";
import Login from "./components/Login";
import Chat from "./components/Chat";
import CreateUser from "./components/Createuser";
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login,
    },
    {
        path: CREATE_USER_ROUTE,
        Component: CreateUser,
    },
];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat,
    },
];
