"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UserProfile({ params }: any) {
  const [user, setUser] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await axios.get("/api/users/me");
      const res = user.data.data;
      setUser(res);
      toast.success("User data fetched successfully");
      return;
    } catch (error: any) {
      console.log(error.message);
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
      <h1 className="text-2xl mb-4 text-white">User Profile</h1>
      <p>
        Profile ID:{" "}
        <span className="bg-orange-500 p-2 rounded">{params.id}</span>
      </p>
      <div className="mt-6 flex flex-col text-center gap-2 p-2 bg-zinc-800 rounded">
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
        <p>isVerified: {`${user?.isVerified}`}</p>
      </div>
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md my-2 ease-in-out duration-200 absolute top-2 right-3"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
