"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const ResetPasswordPage: React.FC = () => {
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (user.password.length > 2 && user.confirmPassword.length > 2) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user.confirmPassword, user.password]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user.password !== user.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      setLoading(true);
      setButtonDisabled(true);
      const reqBody = {
        password: user.password,
        confirmPassword: user.confirmPassword,
        token: token,
      };
      const response = await axios.post("/api/users/resetpassword", reqBody);
      toast.success(response.data.message);
      router.push("/login");
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
      <h1 className="text-2xl mb-4 text-white">Reset Password</h1>
      <form
        className="bg-zinc-900 rounded-lg px-4 py-2 mb-2 flex flex-col items-center shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="password"
          placeholder="Password"
          className="bg-transparent border border-gray-500 rounded-md text-white w-full my-2 p-2 focus:border-white hover:border-white outline-none ease-in-out duration-200"
          value={user.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="bg-transparent border border-gray-500 rounded-md text-white w-full my-2 p-2 focus:border-white hover:border-white outline-none ease-in-out duration-200"
          value={user.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
        />
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
            <span>Update Password</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
