"use client";

import React, { useEffect, useState } from "react";
import TodoTable from "./components/todo-table";
import { ModeToggle } from "@/components/switch-mode";
import AddTodo from "./components/add-todo";
import axios from "axios";
import { serverURL } from "@/lib/serverConfig";
import { useRouter } from "next/navigation";
import Logout from "@/components/logout";

interface Todo {
  user_id: string;
  tid: number;
  description: string;
  due: string;
}

function Page() {
  // corrected function name to uppercase Page
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [onTodoAdded, setOnTodoAdded] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }

    if (localStorage.getItem("oAuth") === "false") {
      axios
        .get(`${serverURL}/todos/getUser`, {
          headers: {
            Authentication: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUsername(response.data[0].user_name);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${serverURL}/todos`, {
          headers: {
            Authentication: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const getUserData = async () => {
        await fetch(`${serverURL}/oauths/getUserData`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setUsername(data.name);
          });
      };
      getUserData();

      axios
        .get(`${serverURL}/oAuths`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [onTodoAdded]);

  return (
    <main className="flex justify-center items-center h-screen">
      <h1 className="absolute top-10 left-10 text-xl">
        Hello <span className="font-semibold text-2xl">{username}!</span>
      </h1>
      <ModeToggle />
      <Logout />
      <section className="w-[40%] flex flex-col gap-2">
        <AddTodo todos={todos} setOnTodoAdded={setOnTodoAdded} />
        <TodoTable todos={todos} setOnTodoAdded={setOnTodoAdded} />
      </section>
    </main>
  );
}

export default Page;
