'use client'; // Add this directive at the top of the file

import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTheme } from 'next-themes';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { AiOutlineMail } from 'react-icons/ai';
import Loader from '@/app/components/Loader/Loader';
import { format } from 'timeago.js';

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: userData } = useGetAllUsersQuery({});
  const { data: courseData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    if (data && userData && courseData) {
      const temp = data.orders.map((item: any) => {
        const user = userData.users.find((user: any) => user._id === item.userId);
        const course = courseData.courses.find((course: any) => course._id === item.courseId);
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: `$${course?.price || 0}`,
        };
      });
      setOrderData(temp);
    }
  }, [data, userData, courseData]);

  const columns: any = [
    { 
      field: 'id', 
      headerName: 'ID', 
      flex: 0.3,
      renderCell: (params: any) => (
        <span style={{ color: theme === 'dark' ? 'white' : 'black' }}>
          {params.row.id}
        </span>
      ),
    },
    { 
      field: 'userName', 
      headerName: 'Name', 
      flex: isDashboard ? 0.6 : 0.5,
      renderCell: (params: any) => (
        <span style={{ color: theme === 'dark' ? 'white' : 'black' }}>
          {params.row.userName}
        </span>
      ),
    },
    { 
      field: 'created_at', 
      headerName: 'Created At', 
      flex: 0.5, 
      valueFormatter: ({ value }: any) => format(value),
      renderCell: (params: any) => (
        <span style={{ color: theme === 'dark' ? 'white' : 'black' }}>
          {params.row.created_at}
        </span>
      ),
    },
    { 
      field: 'price', 
      headerName: 'Price', 
      flex: 0.3,
      renderCell: (params: any) => (
        <span style={{ color: theme === 'dark' ? 'white' : 'black' }}>
          {params.row.price}
        </span>
      ),
    }, // Ensure price is displayed here
    ...(isDashboard
      ? []
      : [
          {
            field: 'userEmail',
            headerName: 'Email',
            flex: 0.4,
            renderCell: (params: any) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: isDashboard ? 'flex-end' : 'flex-start', // Email right-aligned if dashboard
                    alignItems: 'center',
                  }}
                >
                  {!isDashboard && (
                    <AiOutlineMail
                      className="dark:text-white text-black"
                      size={20}
                      style={{ marginRight: '8px' }}
                    />
                  )}
                  <a
                    href={`mailto:${params.row.userEmail}`}
                    style={{ color: theme === 'dark' ? 'white' : 'black' }}
                  >
                    {params.row.userEmail}
                  </a>
                </div>
              );
            },
          },
        ]),
  ];

  const rows: any = orderData.map((item) => ({
    id: item._id,
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    created_at: format(item.createdAt),
  }));

  return (
    <div className={!isDashboard ? 'mt-[120px] flex-grow' : 'mt-[0px] flex-grow'}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="h-full w-full" sx={{ p: isDashboard ? 0 : 3 }}>
          <Box
            sx={{
              height: isDashboard ? '35vh' : '75vh',
              width: '100%',
              '& .MuiDataGrid-root': {
                border: 'none',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
                color: theme === 'dark' ? '#A020F0' : '#000',
              },
              '& .MuiDataGrid-row': {
                backgroundColor: theme === 'dark' ? '#1F2A40' : '#FFF',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: theme === 'dark' ? '#3e4396' : '#A4A9FC',
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              checkboxSelection={!isDashboard}
             
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
