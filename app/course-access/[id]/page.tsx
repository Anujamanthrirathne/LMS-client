'use client';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import CourseContent from '../../components/Course/CourseContent';

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params?.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined,{});

  useEffect(() => {
    console.log("Query State:", { isLoading, error, data });

    if (!isLoading) {
      // Check for errors or invalid data
      if (data?.success === false) {
        redirect('/');
      }

      if (data) {
        const { role, courses } = data.user;

        // Allow admins to access the course content page
        if (role === 'admin') {
          return; // Admins can access everything
        }

        // Check if the course has been purchased
        const isPurchased = courses.some((item: any) => item.courseId === id);
        if (!isPurchased) {
          redirect('/');
        }
      } else if (error) {
        redirect('/');
      }
    }
  }, [isLoading, data, error, id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <CourseContent id={id} user={data.user} />
    </div>
  );
};

export default Page;
