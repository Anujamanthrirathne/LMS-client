'use client';
import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../payment/CheckoutForm"
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  clientSecret:string;
  stripePromise:any;
  setRoute:any;
  setOpen:any;
};

const CourseDetails = ({ data,stripePromise,clientSecret,setRoute,setOpen:openAuthModel }: Props) => {
  
  const { user } = useSelector((state: any) => state.auth);
  const [open,setOpen] = useState(false);
  const discountPercentage =
    ((data.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased = user && user.courses?.some((item: any) => item.courseId === data._id);

  const isAdmin = user && user.role === "admin";

  const [isPurchasedLocally, setIsPurchasedLocally] = useState(false);

  const handlePurchaseSuccess = () => {
    setIsPurchasedLocally(true); // Update local state
    setOpen(false); // Close modal
  };



  const handleOrder = (e: any) => {
    if(user){
      setOpen(true);
    } else{
        setRoute("Login")
        openAuthModel(true);
    }
     
  };
  
  console.log("stripePromise", stripePromise);
console.log("clientSecret", clientSecret);
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[21px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What are the prerequisites for starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course OverView
              </h1>
               <CourseContentList data={data?.courseData} isDemo={true}/> 
            </div>
            <br />
            <br />
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
  <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
    Course Reviews
  </h1>
  <div className="w-full mt-4">
    <Ratings rating={data?.ratings} />
    <h5 className="text-[20px] text-black dark:text-white mt-2">
      {Number.isInteger(data?.ratings)
        ? data?.ratings.toFixed(1)
        : data?.ratings.toFixed(2)}{" "}
      ● {data?.reviews?.length} Reviews
    </h5>
  </div>

  <div className="mt-5">
    {data?.reviews && [...data.reviews].reverse().map((item: any, index: number) => (
      <div key={index} className="w-full border-b pb-4 mb-4 last:border-none">
        <div className="flex items-center">
          <Image
            src={item.user?.avatar?.url || "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"}
            width={50}
            height={50}
            alt="User Avatar"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="ml-3">
            <h5 className="text-[18px] font-medium text-black dark:text-white">{item.user.name}</h5>
            <Ratings rating={item.rating} />
            <p className="text-[16px] mt-1 text-black dark:text-white">{item.comment}</p>
            <small className="text-gray-500 dark:text-gray-400">
              {format(item.createdAt)}
            </small>
          </div>
        </div>

        {/* Display Replies */}
        {item.commentReplies?.map((reply: any, replyIndex: number) => (
          <div
            key={replyIndex}
            className="mt-4 ml-14 flex items-start"
          >
            <Image
              src={reply.user?.avatar?.url || "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"}
              width={40}
              height={40}
              alt="Reply User Avatar"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <div className="ml-3">
              <div className="flex items-center">
                <h5 className="text-[16px] font-medium text-black dark:text-white">{reply.user.name}</h5>
                {reply.user.role === "admin" && (
                  <VscVerifiedFilled className="ml-2 text-blue-500 text-[18px]" />
                )}
              </div>
              <p className="text-[15px] mt-1 text-black dark:text-white">{reply.comment}</p>
              <small className="text-gray-500 dark:text-gray-400">
                {format(reply.createdAt)}
              </small>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>

          </div>

          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data.price === 0 ? "Free" : data.price + "$"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {data.estimatedPrice}$
                </h5>

                <h4 className="pl-5 mt-4 text-[22px] text-black dark:text-white">
                  {discountPercentagePrice} % Off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased || isAdmin || isPurchasedLocally  ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    Buy Now {data.price}$
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">● Source code included</p>
              <p className="pb-1 text-black dark:text-white">● Full lifetime access</p>
              <p className="pb-1 text-black dark:text-white">● Certificate of completion</p>
              <p className="pb-3 800px:pb-1 text-black dark:text-white">● Premium Support</p>
            </div>
          </div>
        </div>
      </div>
      <>
      {open && (
  <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 flex items-center justify-center z-50">
    <div className="w-full max-w-[500px] sm:w-[90%] bg-white rounded-xl shadow p-4">
      <IoCloseOutline
        size={40}
        className="cursor-pointer"
        onClick={() => setOpen(false)}
      />
      {stripePromise && clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            setOpen={setOpen}
            data={data}
            onPurchaseSuccess={handlePurchaseSuccess}
            user={user}
          />
        </Elements>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  </div>
)}


      </>
    </div>
  );
};

export default CourseDetails;