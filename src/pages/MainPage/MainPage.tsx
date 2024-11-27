import { AddOfficeBlock } from "@/components/shared/AddOfficeBlock";
import OfficeCard from "@/components/shared/OfficeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/ui/title";
import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { getOffices } from "@/services/OfficesOperations/OfficesOperations";
import { Office } from "@/services/OfficesOperations/OfficesOperations.type";
import { Download, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const MainPage = () => {
  const [offices, setOffices] = useState<Office[] | null>(null);

  const updateData = useCallback(async () => {
    getOffices().then((data) => data && setOffices(data));
  }, []);

  useEffect(() => {
    updateData();
  }, [updateData]);
  return (
    <div>
      <div className="w-full flex items-center justify-between max-sm:block">
        <Title size="md" text="Главная" />
        {offices?.length && (
          <div className="w-2/5 flex items-center gap-4 max-lg:w-3/5 max-sm:w-full max-sm:mt-4 flex-wrap justify-end">
            <Input />
            {localStorage.getItem("role") === "admin" ? (
              <AddOfficeBlock updateData={updateData} />
            ) : (
              <Button disabled>
                <Plus />
                Добавить офис
              </Button>
            )}
            <Button
              onClick={async () => {
                try {
                  const response = await axiosInstance.get("/offices/stats", {
                    responseType: "arraybuffer",
                  });

                  const blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  });
                  const blobUrl = URL.createObjectURL(blob);

                  const anchor = document.createElement("a");
                  anchor.href = blobUrl;
                  anchor.download = "stats";
                  document.body.appendChild(anchor);
                  anchor.click();
                  document.body.removeChild(anchor);

                  URL.revokeObjectURL(blobUrl); // Clean up the blob URL
                } catch (error) {
                  console.error("Error downloading the file:", error);
                }
              }}
            >
              <Download /> Статистика
            </Button>
          </div>
        )}
      </div>

      {offices?.length ? (
        <div className="mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices?.map((item) => (
            <OfficeCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center flex-col gap-8 mt-40">
          <Title size="md" text={"У вас нет офисов"} />
          <AddOfficeBlock updateData={updateData} />
        </div>
      )}
    </div>
  );
};

export default MainPage;
