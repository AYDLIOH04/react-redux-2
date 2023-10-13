import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: (limit = "") => `products?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: "products",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productsApi;
