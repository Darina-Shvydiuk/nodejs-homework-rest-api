import { Contact } from "../schema/contactsModel.js";

export const getContacts = async () => {
    const contacts = await Contact.find();
    console.log(contacts);
    return contacts;
};

export const getContactById = async (id) => {
    const contact = await Contact.findById(id);

    return contact;
};

export const removeContact = async (id) => {
    return await Contact.findByIdAndRemove(id);
};

export const addContact = async ({ name, email, phone }) => {
    return await Contact.create({ name, email, phone });
};

export const updateContact = async (id, body) => {
    return await Contact.findByIdAndUpdate(id, body, { new: true });
};
