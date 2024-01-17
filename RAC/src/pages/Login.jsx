// SignUpForm.js

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import axios from 'axios'

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    
    .email('Email format is not valid'),
  username: z
    .string()
    .nonempty('Username is required')
    .min(5, 'Username must be at least 5 characters long')
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({resolver: zodResolver(schema)
  });

  const onSubmitForm = async (data) => {
    const username = data.username.trim();
    const email = data.email

    const response = await axios.post('/signup', { username, email });

    const result = await response.data;

    console.log(result.message)

    // console.log(result)

    // Use the data returned from the backend as needed
    // console.log(data);
  };

      // Assuming the response data contains a 'message' field
  


  return (
    <div>
      <form
              className="py-4 md:py-6 font-typo"
              noValidate
              onSubmit={handleSubmit(onSubmitForm)}
            >
              <div>
                <label
                  className="block font-bold mb-2 text-lg md:text-xl"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border-b dark:border-[#434343] appearance-none w-full py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline text-lg md:text-xl dark:bg-transparent "
                  id="email"
                  type="email"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 font-semibold">
                  {errors.email.message}
                </span>
              )}

              <div className="mt-1">
                <label
                  className="block font-bold mb-2 text-lg md:text-xl"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="border-b dark:border-[#434343] appearance-none w-full py-2 mb-3 leading-tight focus:outline-none focus:shadow-outline text-lg md:text-xl dark:bg-transparent"
                  id="username"
                  type="text"
                  {...register('username')}
                />
              </div>
              {errors.username && (
                <span className="text-red-500 font-semibold">
                  {errors.username.message}
                </span>
              )}
              <div>
                <button
                  className="bg-lighter text-black hover:bg-lightest  font-bold py-2 px-4 rounded-sm text-lg md:text-xl duration-300 active:scale-95 mt-3 shadow"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
    </div>
  );
};

export default SignUpForm;
