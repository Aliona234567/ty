import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from './type';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Data'], // Определяем tagTypes для использования providesTags и invalidatesTags
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getTasks: builder.query<ITask[], void>({
      query: () => ({
        url: '/tasks',
      }),
      providesTags: ['Data'], // Указываем, что этот запрос предоставляет тег 'Data'
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Data'], // Указываем, что после выполнения мутации нужно инвалидировать тег 'Data'
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Data'], // Указываем, что после выполнения мутации нужно инвалидировать тег 'Data'
    }),
    updateTask: builder.mutation({ // Добавлена мутация для обновления задачи
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH', // Используем метод PATCH для частичного обновления
        body: patch,
      }),
      invalidatesTags: ['Data'], // Инвалидируем тег 'Data' после обновления
    }),
  }),
});

export const { useCreateTaskMutation, useRegisterMutation, useLoginMutation, useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } = apiSlice; // Экспортируем хук для useUpdateTaskMutation
