'use client';
import React from 'react';
import Heading from '../utils/Heading';
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from '../hooks/adminProtected';
import DashboardHero from "../components/DashboardHero";



const page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading 
          title="ELearning - admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,REDUX,Machine Learning"
        />
        <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[84%] sm:w-[80%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
