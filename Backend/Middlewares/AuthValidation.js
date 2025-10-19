import Joi from "joi";


const signupSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
});


const signupValidation = (req, res, next) => {
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error });
    }
    next();
};


export { signupValidation, loginValidation };
