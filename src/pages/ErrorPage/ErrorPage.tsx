import ErrorImg from "@/assets/errorCat.png";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ArrowLeft, Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <ProtectedRoute>
      <Container className="flex items-center flex-col gap-5 h-screen justify-center">
        <img src={ErrorImg} width={500} />
        <h1 className="text-3xl font-bold flex items-center gap-2 ">
          Упс, что-то сломалось{" "}
          <Frown strokeWidth={1.5} width={40} height={40} />
        </h1>
        <Button variant="outline" onClick={() => navigate(-1)} className="w-80">
          <ArrowLeft /> Вернуться
        </Button>
      </Container>
    </ProtectedRoute>
  );
};

export default ErrorPage;
