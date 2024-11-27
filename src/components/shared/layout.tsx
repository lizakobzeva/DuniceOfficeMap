import { Outlet } from "react-router-dom";
import Container from "../ui/container";
import { ProtectedRoute } from "./ProtectedRoute";
import TopBar from "./TopBar";
import { PropsWithChildren, Suspense } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<div>загрузка...</div>}>
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
