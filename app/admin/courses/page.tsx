"use client";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import React from "react";
import DashboardHero from "@/app/components/DashboardHero";
import AllCourses from "../../components/Admin/Course/AllCourses";



const Page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ELearning - admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,REDUX,Machine Learning"
        />
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="h-full 2xl:w-[16%] w-1/5 bg-gray-100">
            <AdminSidebar />
          </div>

          {/* Main Content */}
          <div className="w-[85%]">
            <DashboardHero />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
