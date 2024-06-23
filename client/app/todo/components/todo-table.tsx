"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaTrashCan } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { serverURL } from "@/lib/serverConfig";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Todo {
  user_id: string;
  tid: number;
  description: string;
  due: string;
}

interface TodoTableProps {
  todos: Todo[];
  setOnTodoAdded: Dispatch<SetStateAction<number>>;
}

function TodoTable(props: TodoTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const isOAuth = localStorage.getItem("oAuth") !== "false";

  const deleteTodo = async (tid: number) => {
    const url =
      localStorage.getItem("oAuth") === "false"
        ? `${serverURL}/todos/${tid}`
        : `${serverURL}/oauths/${tid}`;

    const headers = {
      [isOAuth
        ? "Authorization"
        : "Authentication"]: `Bearer ${localStorage.getItem("token")}`,
    };

    try {
      const response = await axios.delete(url, { headers });
      console.log(response);
      toast({
        title: response.data.deleteTodo[0].description,
        description: response.data.message,
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      props.setOnTodoAdded(props.todos.length - 1);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDateUTC(inputDate: string): string {
    const date = new Date(inputDate);

    const timezoneOffset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - timezoneOffset);

    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  }

  return (
    <ScrollArea className="h-[35vh] w-full rounded-md p-2">
      <Table>
        <TableHeader className="h-12">
          <TableRow>
            <TableHead>Todo</TableHead>
            <TableHead className="text-right">Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.todos.map((todo) => {
            let today = new Date();

            let yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            console.log(yesterday);

            console.log("--------");
            return (
              <TableRow
                key={todo.tid}
                onMouseEnter={() => setHoveredRow(todo.tid)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`h-11 ${
                  new Date(todo.due) <= yesterday ? "line-through" : ""
                }`}
              >
                <TableCell>{todo.description}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  {hoveredRow === todo.tid ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-center w-5">
                          <FaTrashCan />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]flex flex-col justify-center items-center">
                        <DialogHeader>
                          <DialogTitle className="text-center">
                            Are you sure you want to delete?
                          </DialogTitle>
                          <DialogDescription className="text-center">
                            Changes made here cannot be undone. Click 'Delete'
                            to remove the to-do item.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            onClick={() => {
                              deleteTodo(todo.tid);
                            }}
                            type="submit"
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    formatDateUTC(todo.due)
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

export default TodoTable;
