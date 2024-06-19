"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

function AddTodo() {
  const [todoInput, setTodoInput] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleDateSelect = (date: React.SetStateAction<Date | undefined>) => {
    setDate(date);
    console.log("Selected Date:", date || new Date());
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(todoInput);
    console.log(date);
    setTodoInput("");
    setDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <Input
          placeholder="Add Todo"
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.target.value);
          }}
        />
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">🗓️</Button>
          </DialogTrigger>
          <DialogContent className="px-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="flex justify-center items-center"
            />
          </DialogContent>
        </Dialog>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default AddTodo;
