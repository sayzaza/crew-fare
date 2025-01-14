import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import CreateEventPage from "../pages/CreateEventPage";


export const homePagePath = "/";

interface IRoute {
  path: string;
  component: ReactElement<any, any>;
  children?: Omit<IRoute, "children">[];
}

export const routes: IRoute[] = [
  {
    path: homePagePath,
    component: <CreateEventPage />,
  },

 
  {
    path: "*",
    component: <Navigate to={homePagePath} replace />,
  },
];
