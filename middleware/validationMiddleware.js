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

export const user = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res
            .status(400)
            .json({ message: validationResult.error.details });
    }
    next();
};

export const updateUserStatus = (req, res, next) => {
    const schema = Joi.object({
        subscription: Joi.any().valid('starter', 'pro', 'business').required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res
            .status(400)
            .json({ message: validationResult.error.details });
    }
    next();
};

export const verificationRepeat = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
        return res
            .status(400)
            .json({ message: validationResult.error.details });
    }
    next();
};