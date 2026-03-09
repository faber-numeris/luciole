import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_AUTH_API_URL}),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: 'authn/register',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const {useRegisterMutation} = authApi;
