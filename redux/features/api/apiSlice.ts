// apiSlice.ts
import { userLoggedIn } from '@/redux/auth/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // Unique name for the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI, // Base URL from environment variables
  }),
  endpoints: (builder) => ({
     refreshToken:builder.query({
      query: (data) => ({
        url: "refreshtoken",
        method: "GET",
        credentials:"include" as const,
      }),
     }),
     loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        credentials:"include" as const,
      }),
      async onQueryStarted(arg,{queryFulfilled,dispatch}){
        try{
            const result = await queryFulfilled;
            dispatch(
                userLoggedIn({
                    accessToken:result.data.accessToken,
                     user: result.data.user,
                })
            );
        }catch (error:any){
                 console.log(error);
        }
    }
     })
  }),
});

export const {useRefreshTokenQuery,useLoadUserQuery} = apiSlice; // Export endpoints (you can add specific endpoint exports here later)
