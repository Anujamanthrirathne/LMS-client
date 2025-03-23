import { apiSlice } from "../api/apiSlice";

export const resourceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 📌 Create a new resource (PDF & Thumbnail upload)
    createResource: builder.mutation({
      query: (formData) => ({
        url: "create-resource",
        method: "POST",
        body: formData, // FormData automatically handles file uploads
        credentials: "include" as const,
      }),
    }),

    // 📌 Get all resources
    getAllResources: builder.query({
      query: () => ({
        url: "get-resource",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // 📌 Get a single resource by ID
    getResourceById: builder.query({
      query: (id) => ({
        url: `get-resource/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // 📌 Edit a resource (update title, description, etc.)
    editResource: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-resource/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    // 📌 Delete a resource
    deleteResource: builder.mutation({
      query: (id) => ({
        url: `delete-resource/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    // 📌 Increment download count
    incrementDownloadCount: builder.mutation({
      query: (id) => ({
        url: `count-resource/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateResourceMutation,
  useGetAllResourcesQuery,
  useGetResourceByIdQuery,
  useEditResourceMutation,
  useDeleteResourceMutation,
  useIncrementDownloadCountMutation,
} = resourceApi;
