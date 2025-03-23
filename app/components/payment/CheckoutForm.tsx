import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || 'https://e-learning-server-three.vercel.app';
const isSecure = ENDPOINT.startsWith('https');
const socketId = socketIO(ENDPOINT, {
  transports: ['websocket'],
  secure: isSecure,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

type Props = {
  setOpen: (open: boolean) => void;
  data: {
    _id: string;
    course: {
      name: string;
    };
  };
  onPurchaseSuccess: () => void;
  user: {
    _id: string;
  };
};

const CheckoutForm = ({ data, setOpen, onPurchaseSuccess, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState<boolean>(false);
  useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Payment error");
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      createOrder({ courseId: data._id, payment_info: paymentIntent });
    }
  };

  useEffect(() => {
    if (orderData) {
      onPurchaseSuccess();
      setLoadUser(true);
      socketId.emit("Notification", {
        title: "New Order",
        message: `You have a new order from ${data.course.name}`,
        userId: user._id,
      });
      redirect(`/course-access/${data._id}`);
    }
  }, [orderData, error, data, user, onPurchaseSuccess]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${styles.button} mt-2 !h-[35px] sm:h-[45px]`}>
          {isLoading ? "paying..." : "pay now"}
        </span>
      </button>
      {message && (
        <div id="payment-message" className="text-red-500 font-Poppins pt-2 sm:text-sm">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
