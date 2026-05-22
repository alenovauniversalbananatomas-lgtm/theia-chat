import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('username').isLength({ min: 3 }).withMessage('Username mínimo 3 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Password mínimo 6 caracteres'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

export const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').exists().withMessage('Password requerido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

export const projectValidation = [
  body('name').isLength({ min: 1 }).withMessage('El nombre del proyecto es requerido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

export const messageValidation = [
  body('content').isLength({ min: 1 }).withMessage('Content requerido'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];
