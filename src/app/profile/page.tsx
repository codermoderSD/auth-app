"use client";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users/me");
      toast.success("User data fetched successfully");
      setUser(response.data.data._id);
    } catch (error: any) {
      return toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      return toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-950">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl mb-4 text-white">Profile</h1>
      <h2 className="mb-4 text-xl">
        {user ? (
          <Link
            href={`/profile/${user}`}
            className="text-blue underline hover:text-blue"
          >
            User: {user}
          </Link>
        ) : (
          "No User"
        )}
      </h2>
      <button
        onClick={getUserDetails}
        disabled={Boolean(user)}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md my-2 ease-in-out duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            Processing{" "}
            <Image src="/loading.svg" alt="loading" width={25} height={25} />
          </span>
        ) : user ? (
          "Got User"
        ) : (
          "Get User"
        )}
      </button>
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md my-2 ease-in-out duration-200 absolute top-2 right-3"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
