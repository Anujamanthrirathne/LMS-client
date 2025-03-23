import React, { FC, useState, useEffect } from "react";
import { styles } from "../../../app/styles/style";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/Assets/signin.gif";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
 useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        setLoading(true); // Start loading when the image is selected
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
      setLoading(false); // Stop loading when the image is successfully updated
      toast.success("Update successfully!");
      window.location.reload(); // Reload the page after avatar update
    }
    if (error || updateError) {
      console.log(error);
      setLoading(false); // Stop loading if there is an error
    }
  }, [isSuccess, error,success,updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
      <div className="relative mt-6"> {/* Added mt-6 for margin at the top */}
  {loading ? (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 rounded-full">
      {/* Simple loading spinner */}
      <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin"></div>
    </div>
  ) : (
    <Image
      src={
        user.avatar || avatar ? user.avatar.url || avatar : avatarIcon
      }
      alt="User Avatar"
      width={180} // Increased image size
      height={180} // Increased image size
      className="w-[150px] h-[150px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
    />
  )}
  <input
    type="file"
    id="avatar"
    className="hidden"
    onChange={imageHandler}
    accept="image/png,image/jpg,image/jpeg,image/webp"
  />
  <label htmlFor="avatar">
    <div className="w-[35px] h-[35px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer dark:bg-gray-700">
      <AiOutlineCamera
        size={20}
        className="text-white dark:text-white z-1"
      />
    </div>
  </label>
</div>

      </div>
      <br />
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2 text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 dark:bg-gray-800 dark:text-white dark:border-gray-600`}
                required
                value={user?.email}
              />
            </div>
            <input
              className="w-full 800px:w-[250px] h-[40px] border-[#37a39a] text-center dark:text-black rounded-[3px] mt-8 cursor-pointer bg-[#37a39a] hover:bg-[#2c8c7a] dark:bg-[#2c8c7a] dark:hover:bg-[#37a39a] transition-all duration-300 ease-in-out transform hover:scale-105 hover:translate-y-[-2px]"
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
