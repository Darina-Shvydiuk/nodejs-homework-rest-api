import express from "express";

import {
    getContactsControllers,
    getContactByIdControllers,
    removeContactControllers,
    addContactControllers,
    updateContactControllers,
    updateContactStatusControllers,
} from "../../controller/contacts.js";

import {
    addContactsValidation,
    updateContactsValidation,
    updateContactsValidationFavorite,
} from "../../middleware/validationMiddleware.js";

import { asyncWrapper } from "../../helpers/apiHelpers.js";
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get("/", asyncWrapper(getContactsControllers));

router.get("/:contactId", asyncWrapper(getContactByIdControllers));

router.post("/", addContactsValidation, asyncWrapper(addContactControllers));

router.delete("/:contactId", asyncWrapper(removeContactControllers));

router.put(
    "/:contactId",
    updateContactsValidation,
    asyncWrapper(updateContactControllers)
);
router.patch(
    "/:contactId/favorite",
    updateContactsValidationFavorite,
    asyncWrapper(updateContactStatusControllers)
);
export default router;
