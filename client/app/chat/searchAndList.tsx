import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import image1 from "../../public/01.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card"; // Ensure you have these components

const usersList = [
  { name: "Shahad Pichen", id: "12f" },
  { name: "Sanu", id: "23f" },
  { name: "Akshay", id: "34" },
  { name: "Afsal M", id: "45" },
  { name: "Rayan", id: "56" },
  { name: "Mishal", id: "67" },
];

function SearchAndList() {
  const [userId, setUserId] = useState<string>("");
  const [userExists, setUserExists] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<{
    name: string;
    id: string;
  } | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setUserId(id);
    const user = usersList.find((user) => user.id === id);
    setUserExists(!!user);
    setSelectedUser(user || null);
  };

  const handleButtonClick = () => {
    if (selectedUser) {
      console.log(selectedUser.id);
    }
  };

  const userSelected = (name: string, id: string) => {
    console.log(name, id);
  };

  return (
    <>
      <div>
        <Input
          type="text"
          placeholder="Enter User Id"
          value={userId}
          onChange={handleInputChange}
        />
        {userExists && selectedUser && (
          <Card className="w-[87%] absolute z-10">
            <CardContent className="p-0">
              <div
                className="flex gap-2 items-center h-[6vh] w-[100%] cursor-pointer hover:bg-zinc-800 rounded-md py-2 px-2"
                onClick={handleButtonClick}
              >
                <div className="flex items-center ml-2 gap-2">
                  <h1 className="text-sm">{selectedUser.name}</h1>
                  <p className="text-xs text-zinc-400">#{selectedUser.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <ScrollArea className="h-[20vh] border rounded-md p-3">
        <div className="flex flex-wrap gap-3">
          {usersList.map((user) => (
            <div
              key={user.id}
              className="flex gap-2 items-center justify-center h-[6vh] max-w-[70%] w-fit cursor-pointer hover:bg-zinc-800 rounded-md py-7 px-2"
              onClick={() => userSelected(user.name, user.id)}
            >
              <Image
                src={image1}
                alt="image1"
                width={40}
                height={40}
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
    </>
  );
}

export default SearchAndList;
