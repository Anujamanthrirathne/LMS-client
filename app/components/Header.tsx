"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import avatar from "../../public/Assets/OIP.jpg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, route, setOpen, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // For mobile sidebar toggle
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data.user?.name,
          avatar: data.user?.image,
        });
      }
    }
    if (isSuccess) {
      toast.success("Login Successfully");
    }
  }, [data, user]);

  // Track scroll to apply active styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the sidebar when clicking outside
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setIsMounted(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            {/* Logo */}
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
              >
                ELearning
              </Link>
            </div>

            {/* Desktop Navigation and Controls */}
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* Mobile Menu Icon */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer text-black dark:text-white"
                  onClick={() => setIsMounted(true)}
                />
              </div>
              {/* User Icon */}
              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user.avatar?.url || avatar}
                    alt="User Avatar"
                    width={50}
                    height={50}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                    style={{
                      border: activeItem === 5 ? "2px solid #37a39a" : "none", // Provide a default 'none' value
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className=" hidden 800px:block cursor-pointer text-black dark:text-white"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {isMounted && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] bg-[#00000024] dark:bg-[unset]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 flex flex-col justify-between">
              {/* Navigation Items */}
              <div>
                <NavItems activeItem={activeItem} isMobile={true} />
                <div className="flex items-center ml-5 my-2">
                  {/* User Icon */}
                  {user ? (
                    <Link href={"/profile"}>
                      <Image
                        src={user.avatar?.url || avatar}
                        alt="User Avatar"
                        width={50}
                        height={50}
                        className="w-[30px] h-[30px] rounded-full cursor-pointer"
                        style={{
                          border:
                            activeItem === 5 ? "2px solid #37a39a" : "none", // Provide a default 'none' value
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                    size={25}
                    className="block 800px:hidden cursor-pointer text-black dark:text-white"
                    onClick={() => setOpen(true)}
                  />
                  
                  )}
                </div>
              </div>
              {/* Copyright Message */}
              <div className="w-full text-center py-4 border-t dark:border-gray-700">
                <p className="text-[14px] text-black dark:text-white">
                  Copyright © 2024 ELearning
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}

      {route === "sign-up" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}

      {route === "Verification" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
