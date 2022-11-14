import {
    getContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
} from "../models/service/contacts.js";

export const getContactsControllers = async (req, res) => {
    const contacts = await getContacts();

    if (!contacts) {
        return res.status(400).json({
            status: `Contact list is empty`,
        });
    }

    return res.json({
        contacts,
        status: `You have received the entire list of contacts`,
    });
};
export const getContactByIdControllers = async (req, res) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);

    if (!contact) {
        return res.status(400).json({
            status: `Failure, no contacts with '${contactId}' found!`,
        });
    }

    return res.json({
        contact,
        status: `We have found a contact for you with such an '${contactId}'`,
    });
};
export const removeContactControllers = async (req, res) => {
    const { contactId } = req.params;

    const removeContacts = await removeContact(contactId);

    if (removeContacts) {
        res.json({ removeContacts, status: `Contact deleted` });
    }

    return res.status(400).json({ status: `Contact not deleted` });
};
export const addContactControllers = async (req, res) => {
    const { name, email, phone } = req.body;

    const newContact = await addContact({ name, email, phone });

    if (newContact) {
        res.json({ newContact, status: `You have added a new contact` });
    }

    return res.status(400).json({ status: `No new contact has been added` });
};
export const updateContactControllers = async (req, res) => {
    const { contactId } = req.params;

    const { name, email, phone } = req.body;

    const updateContacts = await updateContact(contactId, {
        name,
        email,
        phone,
    });

    if (updateContacts) {
        res.json({
            updateContacts,
            status: `Contact with '${contactId}' was successfully changed`,
        });
    }

    return res
        .status(400)
        .json({ status: `Update contact with '${contactId}'failed` });
};
export const updateContactStatusControllers = async (req, res) => {
    const { contactId } = req.params;

    const { favorite } = req.body;

    const updateContacts = await updateContact(contactId, { favorite });

    if (updateContacts) {
        res.json({
            updateContacts,
            status: `Status FAVORITE has been successfully changed`,
        });
    }
    return res
        .status(400)
        .json({ status: `Status FAVORITE could not be changed` });
};
