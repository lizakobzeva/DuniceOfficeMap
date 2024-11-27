import Layout from "@/components/shared/layout";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import LogoIcon from "@/assets/logo.svg";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import Container from "@/components/ui/container";
import AuthPageAsync from "@/pages/AuthPage/AuthPage.async";
import MainPageAsync from "@/pages/MainPage/MainPage.async";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import EmployeesTablePageAsync from "@/pages/EmployeesTablePage/EmployeesTablePage.async";
import InventoriesTablePageAsync from "@/pages/InventoriesTablePage/InventoriesTablePage.async";
import MapPageAsync from "@/pages/MapPage/MapPage.async";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <AuthPageAsync />,
  },
];

export const appRoutersConfig = createBrowserRouter([
  ...authRoutes,
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Container>
          <div className="w-full flex pt-5">
            <LogoIcon />
          </div>
          <MainPageAsync />
        </Container>
      </ProtectedRoute>
    ),
  },

  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/employees/:id",
        element: <EmployeesTablePageAsync />,
      },
      {
        path: "/inventories/:id",
        element: <InventoriesTablePageAsync />,
      },
      {
        path: "/map/:id",
        element: <MapPageAsync />,
      },
    ],
  },
]);
