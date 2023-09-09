"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success(response.data.message);
    } catch (error: any) {
      setError(error.response.data.error);
      return toast.error("Unexpected Error occurred");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center h-screen bg-zinc-950">
        <h1 className="text-4xl mb-4 text-white">Verify Email</h1>
        {!error && (
          <h2 className="mb-4 text-xl bg-white text-black p-2 rounded">
            {token ? `Token: ${token}` : "No Token"}
          </h2>
        )}
        {verified ? (
          <div className="flex flex-col items-center">
            <h2 className="text-xl">Email verified</h2>
            <Link href="/login" className="bg-green-500 p-2 rounded">
              Login
            </Link>
          </div>
        ) : null}

        {error ? (
          <div>
            <h2 className="bg-red-500 p-2 rounded">Error: {error}</h2>
          </div>
        ) : null}
      </div>
    </>
  );
}
