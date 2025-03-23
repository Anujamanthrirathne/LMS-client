import React from 'react';
import { styles } from '../styles/style';

const About = () => {
  return (
    <div>
      <h1 className={`${styles.title} 800px:!text-[45px] !text-[30px]`}>
        What is <span className="text-gradient">ELearning?</span>
      </h1>
      <br />
      <div className="w-[95%] 800px:w-[85%] m-auto text-black dark:text-white">
        <p className="text-[18px] font-Poppins">
          Are you ready to take your programming skills to the next level? Look no
          further than ELearning, the premier programming community dedicated to
          helping new programmers achieve their goals and reach their full potential.
          <br />
          <br />
          As the founder and CEO of ELearning, I know firsthand the challenges that
          come with learning and growing in the programming industry. That&apos;s why I
          created ELearning to provide new programmers with the resources and
          support they need to succeed.
          <br />
          <br />
          At ELearning, we believe that price should never be a barrier to achieving
          your dreams. That&apos;s why our courses are priced low so that anyone,
          regardless of their financial situation, can access the tools and
          knowledge they need to succeed.
          <br />
          <br />
          But ELearning is more than just a community—we&apos;re a family. Our
          supportive community of like-minded individuals is here to help you every
          step of the way, whether you&apos;re just starting out or looking to take your
          skills to the next level.
          <br />
          <br />
          With ELearning by your side, there&apos;s nothing standing between you and your
          dream job. Our courses and community will provide you with the guidance,
          support, and motivation you need to unleash your full potential and become
          a skilled programmer.
          <br />
          <br />
          So what are you waiting for? Join the ELearning family today and let&apos;s
          conquer the programming industry together! With our affordable courses,
          informative videos, and supportive community, the sky&apos;s the limit.
        </p>
        <br />
        {/* Signature with animated underline */}
        <div className="flex justify-start items-center mt-6">
          <span className="font-Signature text-[32px] sm:text-[40px] text-black dark:text-white relative inline-block">
            AnujaManthrirathne
            {/* Underline with animation */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-500 transform transition-all duration-500 ease-in-out underline-animation"></span>
          </span>
        </div>
        <h5 className="mt-4 text-[18px] font-Poppins text-center sm:text-left text-black dark:text-white">
          Founder and CEO of ELearning (chama LMS)
        </h5>
      </div>
    </div>
  );
};

export default About;
