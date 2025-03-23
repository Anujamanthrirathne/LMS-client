import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import { useCreatePaymentIntentMutation, useGetStripePublishlekeyQuery } from "@/redux/features/orders/ordersApi";
import { loadStripe, Stripe } from "@stripe/stripe-js";

type Course = {
  _id: string;
  name: string;
  price: number;
  estimatedPrice: number;
  tags: string[];
  course: {
    name: string;
    price: number;
    tags: string[];
  };
};

type StripeConfig = {
  publishbleKey: string;
};

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState<string>("Login");
  const [open, setOpen] = useState<boolean>(false);

  // Typing the response from the API hooks
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishlekeyQuery({});
  
  const [createpaymentIntent, { data: paymentIntentData }] = useCreatePaymentIntentMutation({});
  
  // Typing state variables
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(Promise.resolve(null));
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishbleKey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createpaymentIntent(amount);
    }
  }, [config, data, createpaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.course.name + " -ELearning"}
            description={
              "ELearning is a platform for students to learn and get help from teachers"
            }
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
