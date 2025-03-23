import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="animate-fadeIn">
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]">
        <br />
        <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* About Section */}
            <div className="space-y-3 group">
              <h3 className="text-[20px] font-[600] text-black dark:text-white transition-all duration-300 group-hover:text-blue-500">
                About
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/about"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="space-y-3 group">
              <h3 className="text-[20px] font-[600] text-black dark:text-white transition-all duration-300 group-hover:text-blue-500">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/courses"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/course-dashboard"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    Course Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links Section */}
            <div className="space-y-3 group">
              <h3 className="text-[20px] font-[600] text-black dark:text-white transition-all duration-300 group-hover:text-blue-500">
                Social Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="https://www.facebook.com/anuja.manthriratne?mibextid=ZbWKwL"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:anujamanthriratne@gmail.com"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    Gmail
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Anujamanthrirathne"
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300 hover:translate-x-2"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info Section */}
            <div className="space-y-3 group">
              <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3 transition-all duration-300 group-hover:text-blue-500">
                Contact Info
              </h3>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300">
                Call Us: +94 077 202 9251
              </p>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300">
                Address: Rathnapura, Sri Lanka
              </p>
              <p className="text-base text-black dark:text-gray-300 dark:hover:text-white transition-all duration-300">
                Mail Us: support@ELearning.com
              </p>
            </div>
          </div>

          <br />
          <p className="text-center text-black dark:text-white animate-pulse">
            Copyright © 2024 ELearning | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
