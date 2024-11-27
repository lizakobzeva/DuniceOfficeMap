import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Office } from "@/services/OfficesOperations/OfficesOperations.type";

const OfficeCard = ({ id, name, image, address }: Office) => {
  return (
    <Link to={`/map/${id}`}>
      <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
        <img
          src={image}
          alt="Elegant Watch"
          className="w-full h-48 object-cover object-center transition duration-300 ease-in-out"
        />
        <CardContent className="mt-4">
          <CardTitle className="text-xl font-semibold truncate">
            {name}
          </CardTitle>
          <CardDescription className="text-gray-700 truncate">
            {address}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default OfficeCard;
