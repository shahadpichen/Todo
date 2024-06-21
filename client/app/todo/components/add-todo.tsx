import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { serverURL } from "@/lib/serverConfig";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Todo {
  user_id: string;
  tid: number;
  description: string;
  due: string;
}
interface AddTodoProps {
  todos: Todo[];
  setOnTodoAdded: Dispatch<SetStateAction<number>>;
}

function AddTodo({ todos, setOnTodoAdded }: AddTodoProps) {
  const [todoInput, setTodoInput] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const handleDateSelect = (date: SetStateAction<Date>) => {
    setDate(date);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formattedDate = format(date, "yyyy-MM-dd");

    try {
      const addTodo = async (url: string, headerKey: string) => {
        const response = await axios.post(
          `${serverURL}/${url}`,
          { description: todoInput, due: formattedDate },
          {
            headers: {
              [headerKey]: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast({
          title: response.data.addedTodo[0].description,
          description: response.data.message,
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
        setOnTodoAdded(todos.length + 1);
        setTodoInput("");
        setDate(new Date());
      };

      if (localStorage.getItem("oAuth") === "false") {
        await addTodo("todos", "Authentication");
      } else {
        await addTodo("oauths", "Authorization");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <Input
          required
          placeholder="Add Todo"
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.target.value);
          }}
        />
        <Dialog>
          <DialogTrigger>
            <div className="border px-2 py-1 rounded-sm">🗓️</div>
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
