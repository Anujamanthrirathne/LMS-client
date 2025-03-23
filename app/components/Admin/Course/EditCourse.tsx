'use client'
import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {  useEditCourseMutation, useGetAllCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {
    id:string;
};
const EditCourse:FC<Props> = ({id}) => {
    const [editCourse,{isSuccess,error}] = useEditCourseMutation();
    const { data, refetch } = useGetAllCoursesQuery(
        {},
        { refetchOnMountOrArgChange: true }
      );
      
      const editCourseData = data && data.courses.find((i:any) => i._id === id);
 
  useEffect(() => {
    if (isSuccess) {
      toast.success("course updated successfully");
     redirect("/admin/courses");
   }
   if (error) {
    if ("data" in error) {
        const errorMessage = error as any;
       toast.error(errorMessage.data.message);
      }
    }
  },[isSuccess,error]);
  const [active, setActive] = useState(0); 

  useEffect(() =>{
    if(editCourseData){
        setCourseInfo({
            name:editCourseData.name,
            description: editCourseData.description,
            price:editCourseData.price,
            estimatedPrice: editCourseData.estimatedPrice,
            tags: editCourseData.tags,
            level: editCourseData.level,
            demoUrl: editCourseData.demoUrl,
            thumbnail: editCourseData?.thumbnail?.url,
        })
        setBenefits(editCourseData.benefits);
        setPrerequisites(editCourseData.prerequisites);
        setCourseContentData(editCourseData.courseData);
    }
  },[editCourseData]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({}); // Final prepared course data object

  const handleSubmit = () => {
    // Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // Format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    // Format course content array
    const formattedCourseContentData = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoSection: content.videoSection,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));
    // Prepare the final course data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
      demoUrl: courseInfo.demoUrl,
    };

    setCourseData(data); // Update the state with the prepared data
    console.log("Prepared Course Data:", data); // For debugging
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({id:editCourseData?._id,data});
  
  };

  return (
    <div className="w-full flex min-h-screen">
      {/* Main content area */}
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            active={active}
            setActive={setActive}
            isEdit={true}
          />
        )}
      </div>

      {/* Sidebar for navigation */}
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive}  />
      </div>
    </div>
  );
};

export default EditCourse;
