import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/Assets/OIP.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar?.url || avatarDefault}
          alt="User Avatar"
          width={40} // Adjusted width
          height={40} // Adjusted height
          className="w-[40px] h-[40px] 800px:w-[50px] 800px:h-[50px] rounded-full cursor-pointer"
        />
        <h5
          className={`pl-2 text-[16px] font-medium 800px:block hidden font-Poppins dark:text-white text-black`}
        >
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5
          className={`pl-2  font-medium 800px:block hidden font-Poppins dark:text-white text-black`}
        >
          Change Password
        </h5>
      </div>

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5
          className={`pl-2  font-medium 800px:block hidden font-Poppins dark:text-white text-black`}
        >
          Enrolled Courses
        </h5>
      </div>

      {
        user.role === "admin" &&(
          <Link
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
         href={"/admin"}
      >
        <MdOutlineAdminPanelSettings size={20} className="dark:text-white text-black" />
        <h5
          className={`pl-2  font-medium 800px:block hidden font-Poppins dark:text-white text-black`}
        >
         Admin Dashboard
        </h5>
      </Link>
        )
      }

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5
          className={`pl-2  font-medium 800px:block hidden font-Poppins dark:text-white text-black`}
        >
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
