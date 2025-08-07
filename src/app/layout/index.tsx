import { Outlet } from "react-router-dom";
import { HomeHeader } from "~widgets/tandaHeader";
import "~app/index.css";

export const GenericLayout = () => {
  return (
    <div className="bg-[#F0F0F0]">
      <div className=" flex flex-col max-w-[1168px] min-h-screen mx-auto  ">
        <HomeHeader />
        <main className="flex-grow max-w-[1168px] mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
