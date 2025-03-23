import Link from "next/link";
import React from "react";

export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/Courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
     <div className="hidden 800px:flex">
  {navItemsData.map((i, index) => (
    <Link
      href={i.url}
      key={index}
      className={`${
        activeItem === index ? "text-[crimson]" : "text-black dark:text-white"
      } text-[18px] px-6 font-Poppins font-[400]`}
    >
      {i.name}
    </Link>
  ))}
</div>


      {/* Mobile version */}
      {isMobile && (
  <div className="800px:hidden mt-5">
    <div className="w-full text-center py-6">
      <Link
        href="/"
        className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
      >
        ELearning
      </Link>
    </div>

    {navItemsData.map((i, index) => (
      <Link
        href={i.url}
        key={index}
        className={`${
          activeItem === index ? "text-[crimson]" : "dark:text-white text-black"
        } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
      >
        {i.name}
      </Link>
    ))}
  </div>
)}

    </>
  );
};

export default NavItems;
