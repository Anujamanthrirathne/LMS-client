"use client";
import React, { FC, useState, useEffect } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogoutQuery } from "@/redux/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const [active, setActive] = useState(1);

  const logOutHandler = async () => {
    await signOut({ callbackUrl: "https://e-learning-client-rho.vercel.app" });

    setLogout(true);
    
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const filterCourses = user.courses
        .map((userCourse: any) =>
          // Match by courseId since user.courses contains an object with courseId
          data.courses.find((course: any) => course._id === userCourse.courseId)
        )
        .filter((course: any) => course !== undefined);
  
      setCourses(filterCourses);
    }
  }, [data, user]);
  

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] bg-white dark:bg-slate-900 bg-opacity-90 border border-gray-300 dark:border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[60]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}

      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80]">
          <ChangePassword />
        </div>
      )}

{active === 3 && (
  <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[120]">
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
      {courses &&
        courses.map((item: any, index: number) => (
          <CourseCard
            item={item}
            key={index}
            user={user}
            isProfile={true}
          />
        ))}
    </div>
    {courses.length === 0 && (
      <h1 className="text-center text-[18px] font-Poppins">
        You don't have any purchased courses!
      </h1>
    )}
  </div>
)}

    </div>
  );
};

export default Profile;
