import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Email format is not valid"),
  userID: z.string().nonempty("UserID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmitForm = async (data) => {
    const userID = data.userID.trim();
    const password = data.password;

    console.log(userID, password);

    const email = data.email;
    const signUpResponse = await axios.post(
      "http://localhost:5001/users/signup",
      {
        userID,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    const signUpResult = signUpResponse.data;
    console.log(signUpResult.message);
  };

  return (
    <div>
      <form
        className="py-6 px-4 md:px-8 font-typo max-w-md mx-auto bg-yellow-100 shadow-md rounded-md"
        noValidate
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            id="email"
            type="text"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            UserID
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            id="userID"
            type="text"
            {...register("userID")}
          />
          {errors.userID && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.userID.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-6">
          <button
            className="bg-yellow-500 text-white hover:bg-yellow-600 font-bold py-2 px-4 rounded-md text-lg md:text-xl transition duration-300"
            type="submit"
          >
            Signup
          </button>
        </div>

        <div>
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link className="text-blue-500 underline" to="/signin">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
