import {express} from "express";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";

import { addContactsValidation, updateContactsValidation } from '../../middleware/middleware.js';

const router = express.Router();


router.get("/", async (req, res, next) => {
  const result = await listContacts();
  if (result) {
    res.json({ contacts, status: "success" });
  } else {
    res.status(500).json({ status: `server error` });
  }
});

router.get("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
  if (!result) {
    return res
      .status(400)
      .json({ status: `no contacts with id '${contactId}' found` });
  }
    res.json({ findToContact, status: "success" });
 


router.post("/",addContactsValidation, async (req, res, next) => {


  const result = await addContact(req.body);
  if (result) {
    res.status(201).json(result);
  } else {
     res.status(500).json({ status: `server error` });
  }
 
});

router.delete("/:contactId", async (req, res, next) => {
 const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (result) {
    res.status(201).json({ status: `contacts delete` });
  } else {
     res.status(500).json({ status: `server error` });
  }
  
});

router.put("/:contactId",updateContactsValidation, async (req, res, next) => {
const { contactId } = req.params;
  const result = await updateContact(contactId,req.body);
  if (result) {
    res.json({ result, status: `success` });
  } else {
     res.status(500).json({ status: `server error` });
  }
});

export default router;