"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { serverURL } from "@/lib/serverConfig";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  auth: boolean;
}

const CLIENT_ID = "Ov23ctMls3JjNcsTNDjv";

export function UserAuthForm({ className, auth, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const queryString = window.location.search;
    const URLparams = new URLSearchParams(queryString);
    const codeParam = URLparams.get("code");
    // console.log(codeParam);

    if (codeParam && !localStorage.getItem("token")) {
      const getAccessToken = async () => {
        await fetch(`${serverURL}/oauths/getAccessToken?code=${codeParam}`, {
          method: "GET",
        })
          .then((response) => {
            // console.log(response);
            return response.json();
          })
          .then((data) => {
            if (data.access_token) {
              localStorage.setItem("token", data.access_token);
              localStorage.setItem("oAuth", "true");
              router.push("/todo");
            }
          });
      };
      getAccessToken();
    }
  }, []);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(email, password);

    setIsLoading(true);

    try {
      let response;
      let token;
      if (auth) {
        response = await axios.post(
          `${serverURL}/users`,
          {
            user_name: name,
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        token = response.data;
      } else {
        response = await axios.post(
          `${serverURL}/users/login`,
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        );
        token = response.data.accessToken;
        console.log(response);
      }

      localStorage.setItem("token", token);
      localStorage.setItem("oAuth", "false");

      setTimeout(() => {
        setIsLoading(false);
        if (token) {
          router.push("/todo");
        }
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

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
  }

  const loginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {auth ? (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                User Name
              </Label>
              <Input
                required
                id="name"
                placeholder="Shahad"
                name="name"
                type="name"
                disabled={isLoading}
              />
            </div>
          ) : (
            <></>
          )}

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              required
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              required
              id="password"
              placeholder="***"
              type="password"
              name="password"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} className="mt-5">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {auth ? "Sign Up with Email" : "Sign In with Email"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={loginWithGithub}
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
