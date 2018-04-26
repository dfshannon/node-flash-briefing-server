import Joi from 'joi';

// POST /event
export const addEvent = {
    body: {
        updateDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required(),
        titleText: Joi.string().required(),
        mainText: Joi.string().required(),
        redirectionUrl: Joi.string().uri().required()
    }
};

// PUT /event/:id
export const updateEvent = {
    body: {
        updateDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        titleText: Joi.string().optional(),
        mainText: Joi.string().optional(),
        redirectionUrl: Joi.string().uri().optional()
    },
    options: {
        allowUnknownBody: false
    }
};

