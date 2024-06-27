"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import image1 from ".././../public/01.png";
import { IoMdSend } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchAndList from "./searchAndList";
import axios from "axios";
import { serverURL } from "@/lib/serverConfig";

function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const [updateFlag, setUpdateFlag] = useState(false);

  const parsedMessages = messages?.map((message) => JSON.parse(message));

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    axios
      .get(`${serverURL}/chats/${chatId}`, {
        headers: {
          Authentication: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.length !== 0) {
          setMessages(response.data[0].messages);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chatId, updateFlag]);

  const handleMessageSend = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    axios
      .post(
        `${serverURL}/messages`,
        { chat_id: chatId, message: inputMessage },
        {
          headers: {
            Authentication: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setInputMessage("");
        setUpdateFlag((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="mt-4 flex flex-col justify-between h-[83vh]">
      <SearchAndList setName={setName} setId={setId} setChatId={setChatId} />

      <section className="flex flex-col border rounded-md p-3 w-full h-[55vh]">
        {id && (
          <>
            <div className="flex gap-4 h-[8vh]">
              <Image
                src={image1}
                alt="image1"
                width={50}
                height={50}
                className="rounded-full h-[50px]"
              />
              <div className="flex flex-col">
                <h1>{name}</h1>
                <p className="text-sm text-zinc-400">{`#${id.slice(-5)}`}</p>
              </div>
            </div>
            <ScrollArea className="h-[41vh]">
              <div className="flex flex-col pr-3 gap-2 ">
                {parsedMessages?.map((listOfChats) => {
                  return (
                    <div
                      // key={id}
                      className={`flex ${
                        listOfChats.user_id === localStorage.getItem("user_id")
                          ? "justify-end"
                          : "justify-start"
                      } w-full`}
                    >
                      <p
                        className={`flex p-2 rounded-md text-sm max-w-[70%] w-fit ${
                          listOfChats.user_id ===
                          localStorage.getItem("user_id")
                            ? "bg-zinc-100 text-zinc-900"
                            : "bg-zinc-800 text-zinc-100"
                        }`}
                      >
                        {listOfChats.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <form onSubmit={handleMessageSend}>
              <div className="flex gap-2 h-[6vh] items-end">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <Button type="submit" variant="secondary">
                  <IoMdSend />
                </Button>
              </div>
            </form>
          </>
        )}
      </section>
    </section>
  );
}

export default ChatSection;
