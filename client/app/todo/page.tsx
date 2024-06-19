import React from "react";
import TodoTable from "./components/todo-table";
import { ModeToggle } from "@/components/switch-mode";
import { Button } from "@/components/ui/button";
import AddTodo from "./components/add-todo";

function page() {
  return (
    <main className="flex justify-center items-center h-screen">
      <h1 className="absolute top-10 left-10 text-xl">
        Hello <span className="font-semibold text-2xl">Shahad!</span>
      </h1>
      <ModeToggle />
      <Button className="absolute top-10 right-10 " variant="secondary">
        Logout
      </Button>
      <section className="w-[40%] flex flex-col gap-2">
        <AddTodo />
        <TodoTable />
      </section>
    </main>
  );
}

export default page;
