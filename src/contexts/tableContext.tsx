"use client";
import React from "react";

export enum InboxTypes {
  APPROVE_FIRST_CONTACT_EMAIL = "Approve first contact email",
  APPROVE_REPLY_EMAIL = "Approve reply email",
  RESPONDED_TO_ASKED_QUESTIONS = "Responded to asked questions in reply",
}

export interface Contact {
  name: string;
  company: string;
  type: InboxTypes;
}

const defaultContact: Contact = {
  name: "Prod",
  company: "AgentProd",
  type: InboxTypes.APPROVE_FIRST_CONTACT_EMAIL,
};

export interface ContactsTableState {
  rows: Contact[];
  addRow: (contact: Contact) => void;
}

const defaultContactState: ContactsTableState = {
  rows: [defaultContact],
  addRow: () => {},
};

export const ContactsTableContext =
  React.createContext<ContactsTableState>(defaultContactState);

export const useContactsTableContext = () => {
  return React.useContext(ContactsTableContext);
};

interface Props {
  children: React.ReactNode;
}

export const ContactsTableContextProvider: React.FC<Props> = (
  props: Props
): JSX.Element => {
  const [contacts, setContacts] = React.useState<Contact[]>([defaultContact]);

  const addContact = (contact: Contact) => {
    setContacts((currectContacts) => [...currectContacts, contact]);
  };

  const contextValue = React.useMemo(
    () => ({ rows: contacts, addRow: addContact }),
    [contacts]
  );

  return (
    <ContactsTableContext.Provider value={contextValue}>
      {props.children}
    </ContactsTableContext.Provider>
  );
};
