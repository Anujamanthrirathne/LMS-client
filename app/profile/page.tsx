'use client';
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

// Define the type for your Redux state
interface RootState {
  auth: {
    user: {
      name: string;
      email: string;
      // other properties of user
    } | null;
  };
}

const Page: FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  // Use useSelector with the typed state
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <div>Loading...</div>; // Handle case if user is not found
  }

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user.name} profile - ELearning`}
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,REDUX,Machine Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
