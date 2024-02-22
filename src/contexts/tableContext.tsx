"use client";

import { createContext, useState } from "react";
import { InboxRow } from "@/types";

export const TableContext = createContext<{
  rows: InboxRow[];
  addRow: (row: InboxRow) => void;
}>({
  rows: [],
  addRow: () => {},
});

export const TableContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rows, setRows] = useState<InboxRow[]>([]);

  const addRow = (row: InboxRow) => {
    setRows([...rows, row]);
  };

  return (
    <TableContext.Provider value={{ rows, addRow }}>
      {children}
    </TableContext.Provider>
  );
};
