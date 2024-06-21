"use client";

import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { serverURL } from "@/lib/serverConfig";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${serverURL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("oAuth");

      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("AxiosError:", error.message);
        console.error("Error code:", error.code);
        console.error("Error response:", error.response);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      console.log("Login completed");
    }
  };
  return (
    <Button
      className="absolute top-10 right-10"
      onClick={handleLogout}
      variant="secondary"
    >
      Logout
    </Button>
  );
}

export default Logout;
