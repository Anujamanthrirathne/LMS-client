import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
  isDashboard?: boolean;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [orderComparePercentage, setOrderComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePerecentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const orderLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          orderLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = orderLastTwoMonths[1].count;
          const orderPreviousMonth = orderLastTwoMonths[0].count;

          const usersPercentChange = usersPreviousMonth !== 0 ?
            ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *
            100 : 100 ;

          const ordersPercentage = orderPreviousMonth !== 0 ?
            ((ordersCurrentMonth - orderPreviousMonth) / orderPreviousMonth) *
            100 : 100;

          setUserComparePerecentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentage: usersPercentChange,
          });

          setOrderComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: orderPreviousMonth,
            percentage: ordersPercentage,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);
  return (
    <div className="mt-[30px] min-h-screen dark:bg-[#0f1b42] bg-[#fff]">
    {/* Flex layout for User Analytics chart and widgets */}
    <div className="flex flex-col lg:flex-row justify-between items-start dark:bg-[#0f1b42] bg-[#fff]">
      {/* Left column for User Analytics chart */}
      <div className="flex-1 p-8">
        <UserAnalytics isDashboard={true} />
      </div>
      {/* Right column for Sales Obtained and New Users widgets */}
      <div className="flex flex-col w-full lg:w-[300px] mt-[20px] lg:mt-[80px] gap-6">
        {/* Sales Obtained widget */}
        <div className="w-full dark:bg-[#0f1b42] bg-[#fff] rounded-sm shadow mb-6">
          <div className="flex items-center p-5 justify-between">
            <div className="flex items-center">
              <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
              <div className="ml-3">
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {orderComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>
            </div>
            <div>
              <CircularProgressWithLabel value={orderComparePercentage?.percentage || 0} open={open} />
              <h5 className="text-center pt-2 dark:text-white text-black">
                {orderComparePercentage?.percentage !== undefined &&
                orderComparePercentage?.percentage !== null
                  ? `${orderComparePercentage.percentage > 0 ? '+' : ''}${orderComparePercentage.percentage.toFixed(2)}%`
                  : "0.00%"}
              </h5>
            </div>
          </div>
        </div>
  
        {/* New Users widget */}
        <div className="w-full dark:bg-[#0f1b42] bg-[#fff] rounded-sm shadow">
          <div className="flex items-center p-5 justify-between">
            <div className="flex items-center">
              <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
              <div className="ml-3">
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px] font-[400]">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>
            </div>
            <div>
              <CircularProgressWithLabel value={userComparePercentage?.percentage || 0} open={open} />
              <h5 className="text-center pt-2 dark:text-white text-black">
                {userComparePercentage?.percentage !== undefined &&
                userComparePercentage?.percentage !== null
                  ? `${userComparePercentage.percentage > 0 ? '+' : ''}${userComparePercentage.percentage.toFixed(2)}%`
                  : "0.00%"}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    {/* Grid layout for OrdersAnalytics and Recent Transactions */}
    <div className="grid grid-cols-[65%,35%] mt-[30px] dark:bg-[#0f1b42] bg-[#fff]">
      <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
        <OrdersAnalytics isDashboard={true} />
      </div>
      <div className="p-5 dark:bg-[#0f1b42] bg-[#fff]">
        <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
          Recent Transactions
        </h5>
        <AllInvoices isDashboard={true} />
      </div>
    </div>
  </div>
  
  );
};

export default DashboardWidgets;
