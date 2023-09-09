"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user.email.length > 2 && user.password.length > 2) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.email, user.password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setButtonDisabled(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl mb-4 text-white">Login</h1>
      <form
        className="bg-zinc-900 rounded-lg px-4 py-2 mb-2 flex flex-col items-center shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent border border-gray-500 rounded-md text-white w-full my-2 p-2 focus:border-white hover:border-white outline-none ease-in-out duration-200"
          value={user.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-transparent border border-gray-500 rounded-md text-white w-full my-2 p-2 focus:border-white hover:border-white outline-none ease-in-out duration-200"
          value={user.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, password: e.target.value })
          }
        />
        <Link
          href="/forgotpassword"
          className="mb-2 self-end text-xs text-blue-500"
        >
          Forgot Password?
        </Link>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md my-2 ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={buttonDisabled}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              Processing{" "}
              <Image src="/loading.svg" alt="loading" width={25} height={25} />
            </span>
          ) : (
            <span>Login</span>
          )}
        </button>
        <p className="mt-1 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link className="text-blue-500" href="/signup">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
