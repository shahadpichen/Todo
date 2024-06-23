import React from "react";
import Image from "next/image";
import image1 from ".././../public/01.png";
import { IoMdSend } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const usersList = [
  {
    name: "Shahad Pichen",
    id: "24134f",
  },
  {
    name: "Sanu",
    id: "24134f",
  },
  {
    name: "Akshay",
    id: "24134f",
  },
  {
    name: "Afsal M",
    id: "24134f",
  },
  {
    name: "Rayan",
    id: "24134f",
  },
  {
    name: "Mishal",
    id: "24134f",
  },
];

function ChatSection() {
  const userSelected = (name: string, id: string) => {
    console.log(name, id);
  };
  return (
    <section className="mt-4 flex flex-col justify-between h-[83vh]">
      <div>
        <Input type="text" placeholder="Email" />
      </div>
      <ScrollArea className="h-[20vh] border rounded-md p-3">
        <div className="flex flex-wrap gap-3">
          {usersList.map((user) => (
            <div
              className="flex gap-2 items-center justify-center h-[6vh] max-w-[70%] w-fit cursor-pointer hover:bg-zinc-800 rounded-md py-7 px-2"
              onClick={() => userSelected(user.name, user.id)}
            >
              <Image
                src={image1}
                alt="image1"
                width={40}
                className="rounded-full h-[40px]"
              />
              <div className="flex flex-col">
                <h1 className="text-sm">{user.name}</h1>
                <p className="text-xs text-zinc-400">#{user.id}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <section className="flex flex-col border rounded-md p-3 w-full h-[55vh]">
        <div className="flex gap-4 h-[8vh]">
          <Image
            src={image1}
            alt="image1"
            width={50}
            height={50}
            className="rounded-full h-[50px]"
          />
          <div className="flex flex-col">
            <h1>Shahad</h1>
            <p className="text-sm text-zinc-400">shahad@gmail.com</p>
          </div>
        </div>
        <ScrollArea className="h-[41vh]">
          <div className="flex flex-col pr-3 gap-2 ">
            <div className="flex justify-end w-full">
              <p className="flex p-2 bg-zinc-100 text-zinc-900 rounded-md text-sm max-w-[70%] w-fit">
                Hey! How's your day going?
              </p>
            </div>
            <div className="flex justify-start w-full">
              <p className="flex p-2 bg-zinc-800 text-zinc-100 rounded-md text-sm max-w-[70%] w-fit">
                Hey! Pretty good, just got out of a meeting. How about you?
              </p>
            </div>
            <div className="flex justify-end w-full">
              <p className="flex p-2 bg-zinc-100 text-zinc-900 rounded-md text-sm max-w-[70%] w-fit">
                Nice! I'm good too. Just finished my workout.
              </p>
            </div>
            <div className="flex justify-start  w-full">
              <p className="flex p-2 bg-zinc-800 text-zinc-100 rounded-md text-sm max-w-[70%] w-fit">
                I did a mix of cardio and strength training. Trying to get back
                in shape!
              </p>
            </div>

            <div className="flex justify-end w-full">
              <p className="flex p-2 bg-zinc-100 text-zinc-900 rounded-md text-sm max-w-[70%] w-fit">
                Good for you! I need to get back to the gym myself. Been
                slacking lately.
              </p>
            </div>
            <div className="flex justify-start w-full">
              <p className="flex p-2 bg-zinc-800 text-zinc-100 rounded-md text-sm max-w-[70%] w-fit">
                It happens. We should go together sometime. Keep each other
                motivated.
              </p>
            </div>
            <div className="flex justify-end w-full">
              <p className="flex p-2 bg-zinc-100 text-zinc-900 rounded-md text-sm max-w-[70%] w-fit">
                Totally! Lets plan for this weekend?
              </p>
            </div>
            <div className="flex justify-start  w-full">
              <p className="flex p-2 bg-zinc-800 text-zinc-100 rounded-md text-sm max-w-[70%] w-fit">
                Sounds perfect. Saturday morning?
              </p>
            </div>
            <div className="flex justify-end w-full">
              <p className="flex p-2 bg-zinc-100 text-zinc-900 rounded-md text-sm max-w-[70%] w-fit">
                Saturday
              </p>
            </div>
          </div>
        </ScrollArea>
        <div className="flex gap-2 h-[6vh] items-end">
          <Input type="text" placeholder="Type your message..." />
          <Button variant="secondary">
            <IoMdSend />
          </Button>
        </div>
      </section>
    </section>
  );
}

export default ChatSection;
