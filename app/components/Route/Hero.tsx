import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
type Props = {};
import client3 from "../../../public/Assets/client-3.jpg";
import client1 from "../../../public/Assets/client-1.jpg";
import client2 from "../../../public/Assets/client-2.jpg";


const Hero: FC<Props> = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search,setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
       if(search === ""){
        return
       } else{
        router.push(`/Courses?title=${search}`);

       }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col sm:flex-row items-center w-full min-h-screen py-10 sm:py-0">
          {/* Left Section (Image with animation) */}
          <div className="w-full sm:w-[50%] flex justify-center relative h-[60%] sm:h-full">
            <div className="relative flex items-center justify-center w-[80%] sm:w-[70%] h-auto hero-animation rounded-full">
              <Image
                src={data?.layout?.banner?.image?.url}
                width={400}
                height={400}
                alt="Banner"
                className="object-contain w-full h-auto rounded-full z-10 relative"
              />
            </div>
          </div>

          {/* Right Section (Text and Content) */}
          <div className="w-full sm:w-[50%] flex flex-col justify-center items-center sm:items-start text-center sm:text-left px-6 sm:px-10 mt-10 sm:mt-0">
            <h2 className="dark:text-white text-[#000000c7] text-[24px] sm:text-[50px] font-[600] font-josefin leading-[1.2] mb-6">
              {data?.layout?.banner?.title}
            </h2>
            <p className="dark:text-[#edfff4] text-[#000000ac] font-josefin font-[600] text-[16px] sm:text-[18px] mb-8">
              {data?.layout?.banner?.subTitle}
            </p>
            <div className="w-full max-w-[500px] relative mb-8">
              <input
                type="search"
                placeholder="Search Courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border border-[#ccc] dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-l-[5px] p-3 w-full outline-none text-black dark:text-white"
              />
              <div className="absolute flex items-center justify-center w-[50px] h-[50px] cursor-pointer right-0 top-0 bg-[#39c1f3] rounded-r-[5px]" onClick={handleSearch}>
                <BiSearch className="text-white" size={25} />
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start">
              <Image
                src={client3}
                alt="Client 3"
                className="rounded-full w-12 h-12"
              />
              <Image
               src={client1}
                alt="Client 1"
                className="rounded-full w-12 h-12 ml-[-10px]"
              />
              <Image
                src={client2}
                alt="Client 2"
                className="rounded-full w-12 h-12 ml-[-10px]"
              />
              <p className="font-josefin dark:text-[#edfff4] text-[#000000b3] text-[16px] sm:text-[18px] font-[600] ml-4">
                500K+ people already trusted us.{" "}
                <Link
                  href="/courses"
                  className="dark:text-[#46e256] text-[crimson] font-bold"
                >
                  View Courses
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
