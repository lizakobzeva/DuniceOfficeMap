// import { getUser } from "@/features/GetUser/model/service/GetUser/GetUser";
import { getLocationQuery } from "@/lib/helpers/getLocationQuery";
import { showErrorNotification } from "@/lib/helpers/notification";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader/Loader";
import Container from "../ui/container";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("access_token");
    const access_token = token ? token : "";
    if (!access_token) {
      const backPath = getLocationQuery("back") || location.pathname.slice(1);
      const url = backPath ? `/login?back=${backPath}` : "/login";
      navigate(url);
      return;
    }
    (async () => {
      try {
        // await getUser();
      } catch (error) {
        showErrorNotification(`Ошибка: ${error}`);
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    })();
    setIsLoading(false);
  }, [navigate]);

  if (isLoading)
    return (
      <Container className="w-full h-[100vh] flex items-center justify-center">
        <Loader />
      </Container>
    );

  return children;
};
