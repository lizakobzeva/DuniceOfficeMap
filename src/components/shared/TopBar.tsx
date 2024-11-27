import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Users, Map, House, Monitor, Menu } from "lucide-react";
import LogoIcon from "@/assets/logo.svg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const TopBar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();
  return (
    <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex ">
      <div className={` md:block md:pb-0 md:mt-0 max-md:hidden`}>
        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
          <li>
            <Button
              variant="outline"
              className="min-w-[150px] w-1/6"
              onClick={() => navigate("/")}
            >
              <House />
              На главную
            </Button>
          </li>
          <li>
            <Button
              variant={pathname === `/map/${id}` ? "default" : "secondary"}
              className="min-w-[150px] w-1/6"
              onClick={() => navigate(`/map/${id}`)}
            >
              <Map />
              Карта
            </Button>
          </li>
          <li>
            <Button
              variant={
                pathname === `/employees/${id}` ? "default" : "secondary"
              }
              className="min-w-[150px] w-1/6"
              onClick={() => navigate(`/employees/${id}`)}
            >
              <Users /> Сотрудники
            </Button>
          </li>
          <li>
            <Button
              variant={
                pathname === `/inventories/${id}` ? "default" : "secondary"
              }
              className="min-w-[150px] w-1/6"
              onClick={() => navigate(`/inventories/${id}`)}
            >
              <Monitor /> Оборудование
            </Button>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between py-3 md:py-5 md:block">
        <Link to="/">
          <LogoIcon />
        </Link>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="icon" variant="outline">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Меню</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/")}
              >
                <House />
                На главную
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(`/map/${id}`)}
              >
                <Map />
                Карта
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(`/employees/${id}`)}
              >
                <Users /> Сотрудники
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate(`/inventories/${id}`)}
              >
                <Monitor /> Оборудование
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
