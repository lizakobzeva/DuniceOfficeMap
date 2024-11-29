import { Outlet } from "react-router-dom";
import Container from "../ui/container";
import { ProtectedRoute } from "./ProtectedRoute";
import TopBar from "./TopBar";
import { PropsWithChildren, Suspense } from "react";
import Loader from "./Loader/Loader";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense
      fallback={
        <Container className="w-full h-[100vh] flex items-center justify-center">
          <Loader />
        </Container>
      }
    >
      <ProtectedRoute>
        <Container>
          <TopBar />
          {children || <Outlet />}
        </Container>
      </ProtectedRoute>
    </Suspense>
  );
};

export default Layout;
