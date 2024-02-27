"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import ContactsTable from "@/components/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { useRef, useState } from "react";
import { InboxTypes, useContactsTableContext } from "@/contexts/tableContext";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { rows, addRow } = useContactsTableContext();

  const lastPage = Math.ceil(rows.length / itemsPerPage);
  const nameRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<InboxTypes | null>(null);

  const addFetchedRowHandler = async () => {
    const contact = await fetch("https://randomuser.me/api/").then((response) =>
      response.json()
    );
    addRow({
      name: contact.results[0].name.first,
      company: "AgentProd",
      type: InboxTypes["APPROVE_FIRST_CONTACT_EMAIL"],
    });
  };

  const bulkFetchAddRows = async () => {
    const allContacts = [];
    for (let i = 0; i < 5; i++) {
      const contact = await fetch("https://randomuser.me/api/").then(
        (response) => response.json()
      );
      allContacts.push(contact);
    }
    console.log("all contacts:", allContacts);
    allContacts.forEach((contact) => {
      addRow({
        name: contact.results[0].name.first,
        company: "AgentProd",
        type: InboxTypes["APPROVE_FIRST_CONTACT_EMAIL"],
      });
    });
  };

  const addRowHandler = () => {
    console.log(nameRef.current?.value, companyRef.current?.value, type);
    if (nameRef.current && companyRef.current && type) {
      addRow({
        name: nameRef.current.value,
        company: companyRef.current.value,
        type,
      });
      nameRef.current.value = "";
      companyRef.current.value = "";
      setType(null);
    }
    console.log("addRowHandler");
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const canNextPage = () => {
    return currentPage < lastPage;
  };

  const canPreviousPage = () => {
    return currentPage > 1;
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
        <ContactsTable currentPage={currentPage} itemsPerPage={itemsPerPage} />
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${itemsPerPage}`}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {lastPage}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setCurrentPage(1)}
              disabled={!canPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => previousPage()}
              disabled={!canPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => nextPage()}
              disabled={!canNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setCurrentPage(lastPage)}
              disabled={!canNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-full h-10">
          <input type="text" placeholder="Name" ref={nameRef} />
          <input type="text" placeholder="Company" ref={companyRef} />
          <Select
            onValueChange={(value) => {
              setType(value as InboxTypes);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={InboxTypes.APPROVE_FIRST_CONTACT_EMAIL}>
                Approve first contact email
              </SelectItem>
              <SelectItem value={InboxTypes.APPROVE_REPLY_EMAIL}>
                Approve reply email
              </SelectItem>
              <SelectItem value={InboxTypes.RESPONDED_TO_ASKED_QUESTIONS}>
                Responded to asked questions in reply
              </SelectItem>
            </SelectContent>
          </Select>
          <div>
            <button onClick={addRowHandler}>Create new row</button>
          </div>
          <div>
            <button onClick={addFetchedRowHandler}>Fetch new contact</button>
          </div>
          <div>
            <button onClick={bulkFetchAddRows}>Bulk fetch new contacts</button>
          </div>
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
