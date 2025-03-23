import React from 'react'
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from '../../../../app/utils/Heading';
import DashboardHeader from '../../../../app/components/DashboardHeader';
import EditResource from '../../../components/Admin/Customization/EditResource';

type SegmentParams<T extends object = any> = T extends Record<string, any>
  ? { [K in keyof T]: T[K] extends string ? string | string[] | undefined : never }
  : T;

export interface PageProps {
  params: SegmentParams; // Fixed: `params` is now a direct object
  searchParams?: any;
}

const Page = ({ params }: PageProps) => {
  const id = params?.id;

  return (
    <div>
      <Heading 
        title="ELearning - admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,REDUX,Machine Learning"
      />
      <div className="flex">
        <div className="150opx:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditResource id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;