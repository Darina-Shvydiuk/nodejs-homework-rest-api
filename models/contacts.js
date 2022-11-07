import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("./models/contacts.json");

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const findContact = contacts.find((contact) => contact.id === contactId);
    if (!findContact) {
      throw new Error(`Id:${findContact} not found`);
    }
    return findContact;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filterContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (contacts.length === filterContacts.length) {
      throw new Error(`ID:${contactId} is absent`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts), "utf8");
    console.log(`contact with ID:${contactId} has been removed`);
  } catch (error) {
    console.log(error.message);
  }
};

export const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contactsList = JSON.stringify([newContact, ...contacts], null, "\t");
    await fs.writeFile(contactsPath, contactsList, "utf8");
    console.log("You have added a new contact");
  } catch (error) {
    console.log(error.message);
  }
};

export const updateContact = async (contactId, { name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const indexContacts = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexContacts < 0) {
      return null;
    }
    contacts[indexContacts] = { contactId, name, email, phone };
    const updateContacts = JSON.stringify(
      [indexContacts, ...contacts],
      null,
      "\t"
    );
    await fs.writeFile(contactsPath, updateContacts, "utf8");
    console.log(`contact with ID:${id} has been update`);
  } catch (error) {
    console.log(error.message);
  }
};
