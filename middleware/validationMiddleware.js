import Joi from "joi";

export const addContactsValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        phone: Joi.string().min(12).max(20).required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ status: validationResult.error.details });
    }
    next();
};

export const updateContactsValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        phone: Joi.string().min(12).max(20).required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ status: validationResult.error.details });
    }
    next();
};

export const updateContactsValidationFavorite = (req, res, next) => {
    const schema = Joi.object({
        favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ status: validationResult.error.details });
    }
    next();
};
