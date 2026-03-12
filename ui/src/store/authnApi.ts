import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authnApi = createApi({
    reducerPath: 'authnApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_AUTH_API_URL}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: 'authn/register',
                method: 'POST',
                body: body,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: 'authn/login',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const {useRegisterMutation, useLoginMutation} = authnApi;
