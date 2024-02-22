export interface InboxHeader {
  contact: string;
  company: string;
  type: string;
}

export enum InboxTypes {
  APPROVE_FIRST_CONTACT_EMAIL = "Approve first contact email",
  APPROVE_REPLY_EMAIL = "Approve reply email",
  RESPONDED_TO_ASKED_QUESTIONS = "Responded to asked questions in reply",
}

export interface InboxRow {
  name: string;
  company: string;
  type: InboxTypes;
}
