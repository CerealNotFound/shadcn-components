"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ContactsTable from "@/components/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useContext, useRef, useState } from "react";
import { TableContext } from "@/contexts/tableContext";
import { InboxTypes } from "@/types";

export default function Home() {
  const { rows, addRow } = useContext(TableContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<InboxTypes | null>(null);

  const addRowHandler = () => {
    console.log(nameRef.current?.value, companyRef.current?.value, type);
    if (nameRef.current && companyRef.current && type) {
      addRow({
        name: nameRef.current.value,
        company: companyRef.current.value,
        type: InboxTypes[type],
      });
      nameRef.current.value = "";
      companyRef.current.value = "";
      setType(null);
    }
    console.log("addRowHandler");
    console.log(rows);
  };

  return (
    <div className="flex">
      <div className="w-1/5">Navbar</div>
      <div className="flex-col w-full">
        <div className="w-full h-10">
          <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
          </Popover>
        </div>
        <ContactsTable />
        <div className="w-full h-10">
          <input type="text" placeholder="Name" ref={nameRef} />
          <input type="text" placeholder="Company" ref={companyRef} />
          <Select onValueChange={(value) => setType(value as InboxTypes)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="APPROVE_FIRST_CONTACT_EMAIL">
                Approve first contact email
              </SelectItem>
              <SelectItem value="APPROVE_REPLY_EMAIL">
                Approve reply email
              </SelectItem>
              <SelectItem value="RESPONDED_TO_ASKED_QUESTIONS">
                Responded to asked questions in reply
              </SelectItem>
            </SelectContent>
          </Select>
          <button onClick={addRowHandler}>Create new row</button>
        </div>
      </div>
      <div className="w-1/5 flex-col border-l h-screen border-x-gray-800 flex p-2 text-sm">
        <div className="flex">
          <Avatar className="m-2">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="m-2">
            <div className="text-gray-800">Iona Ioxa</div>
            <div className="text-gray-800">iona.ioza@example.com</div>
          </div>
        </div>
        <div className="m-3 text-[0.8rem] leading-5 text-gray-700">
          2 x Exit, Technologist, Serial Entrepreneur, Investor, Advisor and
          Sport/Health Nut.
        </div>
      </div>
    </div>
  );
}
