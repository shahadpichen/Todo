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

const todos = [
  {
    tid: 1,
    description: "Clean Table",
    due: "Today",
  },
  {
    tid: 2,
    description: "Wash The Dishes",
    due: "Nov 10",
  },
  {
    tid: 3,
    description: "Cook Food",
    due: "Tommorow",
  },
  {
    tid: 4,
    description: "Complete the assignment",
    due: "Today",
  },
  {
    tid: 5,
    description: "Wash The Dishes",
    due: "Nov 10",
  },
  {
    tid: 6,
    description: "Cook Food",
    due: "Tommorow",
  },
  {
    tid: 7,
    description: "Complete the assignment",
    due: "Today",
  },
  {
    tid: 8,
    description: "Clean Table",
    due: "Today",
  },
  {
    tid: 9,
    description: "Wash The Dishes",
    due: "Nov 10",
  },
  {
    tid: 10,
    description: "Cook Food",
    due: "Tommorow",
  },
  {
    tid: 14,
    description: "Complete the assignment",
    due: "Today",
  },
  {
    tid: 25,
    description: "Wash The Dishes",
    due: "Nov 10",
  },
  {
    tid: 36,
    description: "Cook Food",
    due: "Tommorow",
  },
];

function TodoTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const deleteTodo = (tid: number) => {
    console.log(tid);
  };

  return (
    <Table>
      <ScrollArea className="h-[35vh] w-full rounded-md p-2">
        <TableHeader className="h-12">
          <TableRow>
            <TableHead>Todo</TableHead>
            <TableHead className="text-right">Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {todos.map((todo) => (
            <TableRow
              key={todo.tid}
              onMouseEnter={() => setHoveredRow(todo.tid)}
              onMouseLeave={() => setHoveredRow(null)}
              className="h-11"
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

                    <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Are you sure you want to delete?
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          Changes made here cannot be undone. Click 'Delete' to
                          remove the to-do item.
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
                  todo.due
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollArea>
    </Table>
  );
}

export default TodoTable;
