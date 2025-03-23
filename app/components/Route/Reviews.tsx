import { styles } from "../../../app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";
import Rpg from "../../../public/Assets/R.jpg";

type Props = {};

export const reviews = [
  {
    name: "Pasindu Gamlath",
    avatar:
      "https://res.cloudinary.com/dwviccr1k/image/upload/v1732375599/avatars/fdjlyufzm6mxw6v8penr.jpg",
    profession: "Student | University of Ruhuna",
    comment:
      " This course provided me with in-depth knowledge and practical skills that I can apply immediately. The content was structured clearly, and the instructor’s explanations were easy to follow. Highly recommended!",
    ratings: 4,
  },
  {
    name: "Nipun Wijesinghe",
    avatar:
      "https://res.cloudinary.com/dwviccr1k/image/upload/v1732904442/avatars/qvlh56kyju3ggqentuyu.jpg",
    profession: "Full Stack developer | Rockland pvt ltd",
    comment:
      "Excellent course! The modules were well-paced, and the assignments were challenging but rewarding. I feel much more confident in my skills now. Thank you for such a great learning experience!",
    ratings: 5,
  },
  {
    name: "Charaka Jayamith",
    avatar:
      "https://res.cloudinary.com/dwviccr1k/image/upload/v1732904928/avatars/det8ppn1nw4ek1jqbu8w.jpg",
    profession: "Ui Ux Engineer | Sri Lanka | SLIIT",
    comment:
      "The course was very informative, and the material was up-to-date with industry standards. I learned a lot and can apply the knowledge right away in my work. The community support was fantastic!",
    ratings: 3,
  },
  {
    name: "Jay Gibs",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    profession: "Computer system engineering student | Canada",
    comment:
      "I loved this course! The material was comprehensive, and I learned so much. The exercises were particularly useful in solidifying my understanding. The feedback on assignments was very detailed and helpful. Looking forward to more courses like this!",
    ratings: 5,
  },
  {
    name: "Mina Davidson",
    avatar:
      "https://th.bing.com/th/id/OIP.I7MQteXmXCLA4xWunMqJAwHaEK?rs=1&pid=ImgDetMain",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "Fantastic course! The lessons were clear and interactive. The hands-on approach helped me gain practical skills that I can implement in my work. The instructor was knowledgeable and always available for questions. Would definitely take another course here!",
    ratings: 2,
  },
  {
    name: "Rosemary Smith",
    avatar:
      "https://th.bing.com/th/id/OIP.Nolz7WP6ihgX54G98AcWnAHaEo?rs=1&pid=ImgDetMain",
    profession: "Fullstack Web Developer | Algeria",
    comment:
      "This course was an amazing experience! The content was very well structured and the real-world examples helped me understand complex concepts more easily. I can apply what I learned in my studies and career right away. Highly recommended!",
    ratings: 4,
  },
  {
    name: "Laura Mckenzie",
    avatar:
      "https://th.bing.com/th/id/R.b30f5ce68a6fdbb786e1622dd4678441?rik=6P%2bOr5%2fAHUhFCg&pid=ImgRaw&r=0",
    profession: "Student | England",
    comment:
      "I really enjoyed this course! The instructors did a fantastic job of breaking down difficult topics and providing hands-on exercises. I feel much more confident in my skills now and I can’t wait to put them to use in future projects. The support from the community was also great!",
    ratings: 5,
  },

  {
    name: "Nick Flair",
    avatar:
      "https://th.bing.com/th/id/OIP.TJuATx9KS2bztejg-3Gj7AHaLH?rs=1&pid=ImgDetMain0",
    profession: "UI Designer |Figma| England",
    comment:
      "it really awesome course all information technology everything explaining if you want zero to hero don't think about twice join this and The support from the community was also great!!!",
    ratings: 5,
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] mx-auto mb-12">
      {/* Image and Text Section */}
      <div className="w-full 800px:flex items-center justify-between space-y-8 800px:space-y-0 800px:space-x-8">
        {/* Image Section */}
        <div className="800px:w-[50%] w-full">
          <Image
            src={Rpg}
            alt="Students collaborating in a learning environment"
            width={460}
            height={460}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="800px:w-[50%] w-full text-center 800px:text-left">
          <h3
            className={`${styles.title} text-2xl sm:text-3xl lg:text-4xl font-Poppins`}
          >
            Our Students Are <span className="text-gradient">Our Strength</span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl dark:text-white text-black">
              See What They Say About Us
            </span>
          </h3>

          <p className={`${styles.label} text-base sm:text-lg text-gray-600 mt-4`}>
            "Our students are the heart of our success. Their feedback,
            experiences, and growth inspire us to continuously improve and offer
            the best learning environment. See what our students have to say
            about their journey with us and how we've helped them reach their
            goals."
          </p>
        </div>
      </div>

      {/* Review Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        {reviews.map((item, index) => (
          <ReviewCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
