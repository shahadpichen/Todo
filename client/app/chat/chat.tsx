import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ChatSection from "./chatSection";

export function Chat() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="absolute bottom-[5%] right-[4%]">
          Chat
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Search User</SheetTitle>
          <SheetDescription>
            Content focused on finding and engaging users for chat.
          </SheetDescription>
          <ChatSection />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
