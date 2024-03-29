import { InboxHeader } from "@/types";
import { useContactsTableContext } from "@/contexts/tableContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ContactsTable = ({
  currentPage,
  itemsPerPage,
}: {
  currentPage: number;
  itemsPerPage: number;
}): JSX.Element => {
  const { rows } = useContactsTableContext();

  const end = currentPage * itemsPerPage;
  const start = end - itemsPerPage;
  const currentItems = rows.slice(start, end);
  console.log(start, end);

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
        {currentItems.map((row, index) => (
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
