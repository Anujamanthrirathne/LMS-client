import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data,refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange:true
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();
  useEffect(() => {
    if (data) {
      setTitle(data?.layout.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image.url);
    }
    if (isSuccess) {
        refetch();
      toast.success("Hero updated successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center w-full min-h-screen py-10 sm:py-0">
        {/* Image Section */}
        <div className="w-full sm:w-[50%] flex justify-center relative h-[60%] sm:h-full">
          <div className="relative flex items-center justify-center w-[80%] sm:w-[70%] h-auto hero-animation rounded-full">
            <div className="relative flex items-center justify-end">
              <img
                src={image}
                alt=""
                className="object-contain w-full h-auto rounded-full z-10 relative"
              />
              <input
                type="file"
                name=""
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-0 right-0 z-20"
              >
                <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
              </label>
            </div>
          </div>
        </div>

        {/* Text Area Section */}
        <div className="w-full sm:w-[50%] flex flex-col justify-center px-5 sm:px-10 space-y-4">
          <textarea
            className="dark:text-white text-[#000000c7] resize-none text-[24px] sm:text-[30px] lg:text-[40px] font-bold leading-tight tracking-wide px-4 py-2 w-full bg-transparent placeholder-gray-400 focus:outline-none"
            placeholder="Improve Your Online Learning Experience Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={2}
          />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500k+ online registered students. Find your desired Courses from them"
            className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] bg-transparent resize-none placeholder-gray-400 focus:outline-none px-4 py-2"
            rows={4}
          />
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34]
      ${
        data?.layout?.banner?.title !== title ||
        data?.layout?.banner?.subTitle !== subTitle ||
        data?.layout?.banner?.image?.url !== image
          ? "cursor-pointer !bg-[#42d383]"
          : "!cursor-not-allowed"
      }
      !rounded`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
