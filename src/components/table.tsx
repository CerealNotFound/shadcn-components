"use client";
import { useContext } from "react";
import { InboxTypes, InboxRow, InboxHeader } from "@/types";
import { TableContext } from "@/contexts/tableContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ContactsTable = () => {
  const { rows } = useContext(TableContext);

  const tableHead: Record<keyof InboxHeader, string> = {
    contact: "Contact",
    company: "Company",
    type: "Type",
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{tableHead.contact}</TableHead>
          <TableHead>{tableHead.company}</TableHead>
          <TableHead>{tableHead.type}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Iona Ioxa</TableCell>
          <TableCell>Fortus Group</TableCell>
          <TableCell>Approve reply emails</TableCell>
        </TableRow>
        {rows.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>{row.company}</TableCell>
            <TableCell>{row.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContactsTable;
