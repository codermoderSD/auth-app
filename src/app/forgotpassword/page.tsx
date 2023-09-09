"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email.length > 2) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setButtonDisabled(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      toast.success(response.data.message);
    } catch (error: any) {
      return toast.error(error.response.data.error);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl mb-2 text-white">Forgot Password</h1>
      <p className="text-gray-500 mb-4 text-center">
        Enter your email and we&apos;ll send you a link to <br /> reset your
        password
      </p>
      <form
        className="bg-zinc-900 rounded-lg px-4 py-2 mb-2 flex flex-col items-center shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="bg-transparent border border-gray-500 rounded-md text-white w-full my-2 p-2 focus:border-white hover:border-white outline-none ease-in-out duration-200"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
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
            <span>Send Email</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
