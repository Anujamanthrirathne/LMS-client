"use client";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import React from "react";
import DashboardHero from "@/app/components/DashboardHero";
import UserAnalytics from "../../components/Admin/Analytics/UserAnalytics";



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
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>

          {/* Main Content */}
          <div className="w-[85%]">
            <DashboardHero />
            <UserAnalytics/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
