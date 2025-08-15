// routes/auth.routes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/middlewareJWT');          // lit Authorization: Bearer <jwt>
const controller = require('../controllers/auth.controller');

const router = express.Router();

/* ===========================
   Helpers (normalisation + anti-HTML)
   =========================== */
const normalizeStr = (s) => String(s ?? '').trim().replace(/\s+/g, ' ');
const toEmail = (s) => String(s ?? '').toLowerCase().trim();

// Refuse toute balise/caractère de contrôle
const noHtml = (value) => {
    if (typeof value !== 'string') throw new Error('Valeur invalide');
    if (/[<>]/.test(value)) throw new Error('HTML interdit');
    if (/[\u0000-\u001F\u007F]/.test(value)) throw new Error('Caractères de contrôle interdits');
    return true;
};

/* ===========================
   Gestion d'erreurs UNIFIÉE
   Retourne 400 + { message, errors: { champ: [msg1, msg2] } }
   =========================== */
const handleValidation = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) return next();

    const errorsByField = {};
    for (const e of result.array()) {
        const field = e.path || e.param || 'global';
        if (!errorsByField[field]) errorsByField[field] = [];
        if (!errorsByField[field].includes(e.msg)) errorsByField[field].push(e.msg);
    }
    return res.status(400).json({
        message: 'Données invalides',
        errors: errorsByField
    });
};

/* ===========================
   Routes
   =========================== */

// POST /api/auth/register
router.post(
    '/register',
    [
        body('pseudo')
            .exists({ checkFalsy: true }).withMessage('Pseudo requis')
            .bail()
            .customSanitizer(normalizeStr)
            .isLength({ min: 1, max: 20 }).withMessage('Pseudo invalide, 1 à 20 caractères')
            .bail()
            .custom(noHtml),

        body('email')
            .exists({ checkFalsy: true }).withMessage('Email requis')
            .bail()
            .customSanitizer(toEmail)
            .isEmail().withMessage('Email invalide')
            .bail()
            .custom(noHtml),   // interdit < >

        body('password')
            .exists({ checkFalsy: true }).withMessage('Mot de passe requis')
            .bail()
            .isLength({ min: 8 }).withMessage('Mot de passe trop court (min. 8)')
            .bail()
            .custom(noHtml)    // interdit < >
    ],
    handleValidation,
    controller.register
);

// POST /api/auth/login
router.post(
    '/login',
    [
        body('email')
            .exists({ checkFalsy: true }).withMessage('Email requis')
            .bail()
            .customSanitizer(toEmail)
            .isEmail().withMessage('Email invalide')
            .bail()
            .custom(noHtml),

        body('password')
            .exists({ checkFalsy: true }).withMessage('Mot de passe requis')
            .bail()
            .custom(noHtml)
    ],
    handleValidation,
    controller.login
);

// GET /api/auth/me (protégé par Bearer token)
router.get('/me', auth, controller.me);

module.exports = router;
